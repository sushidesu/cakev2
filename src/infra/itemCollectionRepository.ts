import {
  GetItemProps,
  IItemCollectionRepository,
  SaveItemProps,
  RemoveItemProps,
  SelectItemProps,
} from "../domain/item/interface/itemCollectionRepository"
import { ItemId } from "../domain/item/itemId"
import { Jancode } from "../domain/jancode"
import { Item } from "../domain/item/item"
import { ItemValue, Storage_v3 } from "./scheme"
import { ChromeStorageClient } from "./chromeStorageClient"

export class ItemCollectionRepository implements IItemCollectionRepository {
  public constructor(private chromeStorageClient: ChromeStorageClient) {}

  public async migrate(): Promise<void> {
    const storage_v3 = await this.chromeStorageClient.storageV3LocalGet()
    const storage_v2 = await this.chromeStorageClient.storageV2LocalGet()
    if (storage_v3) {
      // migrateの必要なし
      // resolve()
      console.log("cakev3 is already exist")
      // return
    }
    if (storage_v2) {
      console.log("execute migrate")
      const new_storage_v3 = this.chromeStorageClient.convertStorageV2ToV3(
        storage_v2
      )
      await this.chromeStorageClient.storageV3LocalSet(new_storage_v3)
    }
  }

  public async saveItem({ id, item }: SaveItemProps): Promise<void> {
    const prev = await this.chromeStorageClient.storageV3LocalGet()
    if (!prev) {
      console.info("cake_v3 not found")
      const newValue: Storage_v3 = {
        selectedItemId: id.value,
        items: {
          [id.value]: ItemCollectionRepository.entityToResource(item),
        },
      }
      await this.chromeStorageClient.storageV3LocalSet(newValue)
    } else {
      const newValue: Storage_v3 = {
        ...prev,
        items: {
          ...prev.items,
          [id.value]: ItemCollectionRepository.entityToResource(item),
        },
      }
      await this.chromeStorageClient.storageV3LocalSet(newValue)
    }
  }

  public async getAllItems(): Promise<Item[]> {
    const storage_v3 = await this.chromeStorageClient.storageV3LocalGet()
    if (!storage_v3) {
      return []
    }
    return Object.values(storage_v3.items)
      .map(item => ItemCollectionRepository.resourceToEntity(item))
      .sort((left, right) => left.order - right.order)
  }

  async removeItem({ id }: RemoveItemProps): Promise<void> {
    const storage_v3 = await this.chromeStorageClient.storageV3LocalGet()
    if (!storage_v3) return

    delete storage_v3.items[id.value]
    await this.chromeStorageClient.storageV3LocalSet(storage_v3)
  }

  async selectItem({ id }: SelectItemProps): Promise<void> {
    const storage_v3 = await this.chromeStorageClient.storageV3LocalGet()
    if (!storage_v3) return

    storage_v3.selectedItemId = id.value
    await this.chromeStorageClient.storageV3LocalSet(storage_v3)
  }

  async unSelectItem(): Promise<void> {
    const storage_v3 = await this.chromeStorageClient.storageV3LocalGet()
    if (!storage_v3) return

    storage_v3.selectedItemId = null
    await this.chromeStorageClient.storageV3LocalSet(storage_v3)
  }

  public async getSelectedItemId(): Promise<ItemId | null> {
    const storage_v3 = await this.chromeStorageClient.storageV3LocalGet()
    if (!storage_v3) {
      return null
    }

    if (storage_v3.selectedItemId) {
      return ItemId.reconstruct(storage_v3.selectedItemId)
    } else {
      return null
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
      order: entity.order,
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
      order: value.order,
    }
  }
}
