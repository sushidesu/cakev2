import { v4 as uuidv4 } from "uuid"
import { CustomBlock } from "../domain/block/block"
import { IShopItem } from "../shopItem"
import { ItemId } from "../domain/item/itemId"
import { Jancode } from "../domain/jancode"
import { Item } from "../domain/item/item"
import {
  ItemValue,
  BlockValue,
  Storage_v2,
  KEY_VERSION_2,
  Storage_v3,
  KEY_VERSION_3,
} from "./scheme"
import { stringToNumber } from "../utils/stringToNumber"

export class ChromeStorageClient {
  public migrate(entireStorage: { [key: string]: any }): Promise<void> {
    return new Promise<void>(resolve => {
      if (Reflect.has(entireStorage, KEY_VERSION_3)) {
        // migrateの必要なし
        // resolve()
        console.log("cakev3 is already exist")
        // return
      }

      if (Reflect.has(entireStorage, KEY_VERSION_2)) {
        console.log("migrate")
        const values = entireStorage[KEY_VERSION_2] as Storage_v2
        const items = Object.fromEntries(
          values.shopItems.map(item => {
            const id = uuidv4()
            return [id, ChromeStorageClient.convertV2toV3(id, item)]
          })
        )
        const id = items.length ? items[0].id : null
        const newValues: Storage_v3 = {
          selectedItemId: id,
          items,
        }
        chrome.storage.local.set(
          {
            [KEY_VERSION_3]: newValues,
          },
          () => {
            resolve()
          }
        )
      }
    })
  }

  public async getAllItems(): Promise<Item[]> {
    return new Promise<Item[]>(resolve => {
      chrome.storage.local.get(KEY_VERSION_3, storage => {
        if (Reflect.has(storage, KEY_VERSION_3)) {
          const v3 = storage[KEY_VERSION_3] as Storage_v3
          resolve(
            Object.values(v3.items).map(item =>
              ChromeStorageClient.resourceToEntity(item)
            )
          )
        } else {
          resolve([])
        }
      })
    })
  }

  private static convertV2toV3(id: string, item: IShopItem): ItemValue {
    const { descriptions, details, imageURL } = item
    const imageBlock: CustomBlock[] = imageURL
      ? [
          {
            id: uuidv4(),
            type: "image",
            value: {
              imageUrl: imageURL,
            },
          },
        ]
      : []
    const textBlocks: CustomBlock[] = descriptions.flatMap<BlockValue>(desc => {
      return [
        {
          id: uuidv4(),
          type: "heading",
          value: {
            content: desc.title,
          },
        },
        {
          id: uuidv4(),
          type: "text",
          value: {
            content: desc.body,
          },
        },
      ]
    })
    const tableBlock: CustomBlock[] = details.length
      ? [
          {
            id: uuidv4(),
            type: "table",
            value: {
              rows: details.map(detail => {
                return {
                  title: detail.title,
                  body: detail.body,
                }
              }),
            },
          },
        ]
      : []
    const blocks: CustomBlock[] = [...imageBlock, ...textBlocks, ...tableBlock]

    return {
      id,
      name: item.name,
      price: stringToNumber(item.price),
      weight: stringToNumber(item.weight),
      stockRakuten: stringToNumber(item.stockRakuten),
      stockMakeshop: stringToNumber(item.stockMakeshop),
      jancodeString: item.jancode,
      blocks,
    }
  }

  private static resourceToEntity(value: ItemValue): Item {
    return {
      id: ItemId.reconstruct(value.id),
      name: value.name,
      price: value.price,
      weight: value.weight,
      stockRakuten: value.stockRakuten,
      stockMakeshop: value.stockMakeshop,
      jancode: Jancode.reconstruct(value.jancodeString),
      blocks: value.blocks,
    }
  }
}
