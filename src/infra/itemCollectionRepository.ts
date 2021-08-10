import {
  IItemCollectionRepository,
  CreateItemProps,
  SaveItemProps,
  RemoveItemProps,
  SelectItemProps,
} from "../domain/item/interface/itemCollectionRepository"
import { ItemId } from "../domain/item/itemId"
import { Jancode } from "../domain/jancode"
import { Item } from "../domain/item/item"
import { ItemValue, BlockValue, Storage_v3 } from "./scheme"
import { ChromeStorageClient } from "./chromeStorageClient"
import { CustomBlock } from "../domain/customBlock/block"
import { BlockId } from "../domain/block/blockId"

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

  public async createItem({ item }: CreateItemProps): Promise<void> {
    const prev = await this.chromeStorageClient.storageV3LocalGet()
    const id = item.id.value
    const order = prev ? ItemCollectionRepository.getNumberOfItems(prev) : 0
    const itemValue = ItemCollectionRepository.entityToResource(item, order)

    const next: Storage_v3 = {
      selectedItemId: id,
      items: {
        ...prev?.items,
        [id]: itemValue,
      },
    }
    await this.chromeStorageClient.storageV3LocalSet(next)
  }

  public async saveItem({ item }: SaveItemProps): Promise<void> {
    const prev = await this.chromeStorageClient.storageV3LocalGet()
    if (!prev) throw new Error("cake_v3 not found")

    const id = item.id.value
    if (!Reflect.has(prev.items, id)) {
      throw new Error(`${id} not found`)
    }

    const target = prev.items[id]
    const itemValue = ItemCollectionRepository.entityToResource(
      item,
      target.order
    )
    const next: Storage_v3 = {
      selectedItemId: id,
      items: {
        ...prev.items,
        [id]: itemValue,
      },
    }
    await this.chromeStorageClient.storageV3LocalSet(next)
  }

  public async getAllItems(): Promise<Item[]> {
    const storage_v3 = await this.chromeStorageClient.storageV3LocalGet()
    if (!storage_v3) {
      return []
    }
    return Object.values(storage_v3.items)
      .sort((left, right) => left.order - right.order)
      .map(item => ItemCollectionRepository.resourceToEntity(item))
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

  private static getNumberOfItems(storage_v3: Storage_v3): number {
    return Object.keys(storage_v3.items).length
  }

  private static entityToResource(entity: Item, order: number): ItemValue {
    return {
      id: entity.id.value,
      name: entity.name,
      price: entity.price,
      weight: entity.weight,
      stockRakuten: entity.stockRakuten,
      stockMakeshop: entity.stockMakeshop,
      jancodeString: entity.jancode?.toString() ?? "",
      blocks: entity.blocks.map(this.blockEntityToResource),
      order,
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
      blocks: value.blocks.map(this.blockResourceToEntity),
    }
  }
  private static blockEntityToResource(blockEntity: CustomBlock): BlockValue {
    return {
      id: blockEntity.id.value,
      type: blockEntity.type,
      value: blockEntity.value,
    }
  }
  private static blockResourceToEntity(blockValue: BlockValue): CustomBlock {
    const id = BlockId.reconstruct(blockValue.id)
    switch (blockValue.type) {
      case "heading":
      case "text":
      case "image":
      case "table":
        return {
          id,
          type: blockValue.type,
          value: blockValue.value,
        }
      default:
        throw Error("invalid type")
    }
  }
}
