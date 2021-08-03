import { v4 as uuidv4 } from "uuid"
import {
  GetItemProps,
  ItemRepositoryInterface,
  SaveItemProps,
} from "../domain/item/itemRepositoryInterface"
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

export class ChromeStorageClient implements ItemRepositoryInterface {
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
        const keys = Object.keys(items)
        const id = keys.length ? keys[0] : null
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
      } else {
        resolve()
      }
    })
  }

  private static async storageV3LocalGet(): Promise<undefined | Storage_v3> {
    return new Promise(resolve => {
      chrome.storage.local.get(KEY_VERSION_3, storage => {
        if (!Reflect.has(storage, KEY_VERSION_3)) {
          resolve(undefined)
        } else {
          resolve(storage[KEY_VERSION_3])
        }
      })
    })
  }
  private static async storageV3LocalSet(value: Storage_v3): Promise<void> {
    return new Promise<void>(resolve => {
      chrome.storage.local.set(
        {
          [KEY_VERSION_3]: value,
        },
        () => {
          resolve()
        }
      )
    })
  }

  public async saveItem({ id, item }: SaveItemProps): Promise<void> {
    const prev = await ChromeStorageClient.storageV3LocalGet()
    if (!prev) {
      console.info("cake_v3 not found")
      const newValue: Storage_v3 = {
        selectedItemId: id.value,
        items: {
          [id.value]: ChromeStorageClient.entityToResource(item),
        },
      }
      await ChromeStorageClient.storageV3LocalSet(newValue)
    } else {
      const newValue: Storage_v3 = {
        ...prev,
        items: {
          ...prev.items,
          [id.value]: ChromeStorageClient.entityToResource(item),
        },
      }
      await ChromeStorageClient.storageV3LocalSet(newValue)
    }
  }

  public async getItem({ id }: GetItemProps): Promise<Item | undefined> {
    const storage_v3 = await ChromeStorageClient.storageV3LocalGet()
    if (!storage_v3) {
      return undefined
    }
    if (!Reflect.has(storage_v3.items, id.value)) {
      return undefined
    }
    const itemValue = storage_v3.items[id.value]
    return ChromeStorageClient.resourceToEntity(itemValue)
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
  public async getSelectedItemId(): Promise<ItemId | null> {
    return new Promise<ItemId | null>(resolve => {
      chrome.storage.local.get(KEY_VERSION_3, storage => {
        if (Reflect.has(storage, KEY_VERSION_3)) {
          const v3 = storage[KEY_VERSION_3] as Storage_v3
          if (v3.selectedItemId) {
            resolve(ItemId.reconstruct(v3.selectedItemId))
          } else {
            resolve(null)
          }
        } else {
          resolve(null)
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

  private static entityToResource(entity: Item): ItemValue {
    return {
      id: entity.id.value,
      name: entity.name,
      price: entity.price,
      weight: entity.weight,
      stockRakuten: entity.stockRakuten,
      stockMakeshop: entity.stockMakeshop,
      jancodeString: entity.jancode.toString(),
      blocks: entity.blocks,
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
