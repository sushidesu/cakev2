import { v4 as uuidv4 } from "uuid"
import { IChromeStorageClient } from "./interface/chromeStorageClient"
import {
  Storage_v2,
  Storage_v3,
  KEY_VERSION_2,
  KEY_VERSION_3,
  BlockValue,
  ItemValue,
} from "./scheme"
import { BlockId } from "../domain/block/blockId"
import { CustomBlock } from "../domain/customBlock/block"
import { IShopItem } from "../shopItem"
import { stringToNumber } from "../utils/stringToNumber"

export class ChromeStorageClient implements IChromeStorageClient {
  async storageV2LocalGet(): Promise<undefined | Storage_v2> {
    return new Promise(resolve => {
      chrome.storage.local.get(KEY_VERSION_2, storage => {
        if (!Reflect.has(storage, KEY_VERSION_2)) {
          resolve(undefined)
        } else {
          resolve(storage[KEY_VERSION_2])
        }
      })
    })
  }
  async storageV3LocalGet(): Promise<undefined | Storage_v3> {
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
  async storageV3LocalSet(value: Storage_v3): Promise<void> {
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

  convertStorageV2ToV3(storage_v2: Storage_v2): Storage_v3 {
    const itemsConverted = Object.fromEntries(
      storage_v2.shopItems.map((item, index) => {
        const id = uuidv4()
        return [id, ChromeStorageClient.convertV2toV3(id, index, item)]
      })
    )
    const keys = Object.keys(itemsConverted)
    const firstItemId = keys.length ? keys[0] : null

    return {
      selectedItemId: firstItemId,
      items: itemsConverted,
    }
  }

  private static convertV2toV3(
    id: string,
    index: number,
    item: IShopItem
  ): ItemValue {
    const { descriptions, details, imageURL } = item
    const imageBlock: CustomBlock[] = imageURL
      ? [
          {
            id: BlockId.create(),
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
          id: BlockId.create(),
          type: "heading",
          value: {
            content: desc.title,
          },
        },
        {
          id: BlockId.create(),
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
            id: BlockId.create(),
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
      order: index,
    }
  }
}
