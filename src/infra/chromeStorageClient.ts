import { v4 as uuidv4 } from "uuid"
import {
  GetItemProps,
  ChromeStorageInterface,
  SaveItemProps,
  RemoveItemProps,
  SelectItemProps,
} from "../domain/item/chromeStorageInterface"
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

export class ChromeStorageClient implements ChromeStorageInterface {
  public async migrate(): Promise<void> {
    const storage_v3 = await ChromeStorageClient.storageV3LocalGet()
    const storage_v2 = await ChromeStorageClient.storageV2LocalGet()
    if (storage_v3) {
      // migrateの必要なし
      // resolve()
      console.log("cakev3 is already exist")
      // return
    }
    if (storage_v2) {
      console.log("migrate")
      const items = Object.fromEntries(
        storage_v2.shopItems.map(item => {
          const id = uuidv4()
          return [id, ChromeStorageClient.convertV2toV3(id, item)]
        })
      )
      const keys = Object.keys(items)
      const firstItemId = keys.length ? keys[0] : null
      await ChromeStorageClient.storageV3LocalSet({
        selectedItemId: firstItemId,
        items,
      })
    }
  }

  private static async storageV2LocalGet(): Promise<undefined | Storage_v2> {
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
    const storage_v3 = await ChromeStorageClient.storageV3LocalGet()
    if (!storage_v3) {
      return []
    }
    return Object.values(storage_v3.items).map(item =>
      ChromeStorageClient.resourceToEntity(item)
    )
  }

  async removeItem({ id }: RemoveItemProps): Promise<void> {
    const storage_v3 = await ChromeStorageClient.storageV3LocalGet()
    if (!storage_v3) return

    delete storage_v3.items[id.value]
    await ChromeStorageClient.storageV3LocalSet(storage_v3)
  }

  async selectItem({ id }: SelectItemProps): Promise<void> {
    const storage_v3 = await ChromeStorageClient.storageV3LocalGet()
    if (!storage_v3) return

    storage_v3.selectedItemId = id.value
    await ChromeStorageClient.storageV3LocalSet(storage_v3)
  }

  public async getSelectedItemId(): Promise<ItemId | null> {
    const storage_v3 = await ChromeStorageClient.storageV3LocalGet()
    if (!storage_v3) {
      return null
    }

    if (storage_v3.selectedItemId) {
      return ItemId.reconstruct(storage_v3.selectedItemId)
    } else {
      return null
    }
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
      jancodeString: entity.jancode?.toString() ?? "",
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
