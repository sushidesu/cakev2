import { v4 as uuidv4 } from "uuid"
import {
  IItemCollectionRepository,
  CreateItemProps,
  SaveItemProps,
  RemoveItemProps,
  SelectItemProps,
  SaveItemsProps,
} from "../../domain/item/interface/itemCollectionRepository"
import { ItemId } from "../../domain/item/itemId"
import { Jancode } from "../../domain/jancode"
import { Item } from "../../domain/item/item"
import { ItemValue, BlockValue, Storage_v3 } from "../scheme"
import { ChromeStorageClient } from "../chrome-storage-client/chrome-storage-client"
import { CustomBlock } from "../../domain/customBlock/block"
import {
  isHeadingBlockValue,
  isImageBlockValue,
  isTableBlockValue,
  isTextBlockValue,
} from "../../domain/customBlock/isCustomBlockValue"
import { BlockId } from "../../domain/block/blockId"
import { SchemeV2Client } from "../scheme-v2-client/scheme-v2-client"
import { PartiallyPartial } from "../../utils/partially-partial"

export class ItemCollectionRepository implements IItemCollectionRepository {
  private converter: SchemeV2Client
  public constructor(private chromeStorageClient: ChromeStorageClient) {
    this.converter = new SchemeV2Client()
  }

  public async migrate(): Promise<void> {
    const storage_v3 = await this.chromeStorageClient.storageV3LocalGet()
    const storage_v2 = await this.chromeStorageClient.storageV2LocalGet()
    if (storage_v3) {
      // subBlocksが無いitemにsubBlocksを追加する
      const subBlocksInitialized: Storage_v3 = {
        selectedItemId: storage_v3.selectedItemId,
        items: Object.fromEntries(
          Object.entries(storage_v3.items).map(([id, item]) => [
            id,
            this.initSubBlocks(item),
          ])
        ),
      }
      await this.chromeStorageClient.storageV3LocalSet(subBlocksInitialized)
    } else {
      console.log("cakev3 doesn't exist yet")
      if (storage_v2) {
        console.log("execute migrate with cakev2")
        const new_storage_v3 = this.converter.convertStorageV2ToV3(storage_v2)
        await this.chromeStorageClient.storageV3LocalSet(new_storage_v3)
      } else {
        console.log("init with empty data")
        await this.chromeStorageClient.storageV3LocalSet({
          items: {},
          selectedItemId: null,
        })
      }
    }
  }

  /**
   * subBlocksが無いitemに、subBlocksプロパティを追加する
   */
  private initSubBlocks(
    item: PartiallyPartial<ItemValue, "subBlocks">
  ): ItemValue {
    return {
      id: item.id,
      name: item.name,
      price: item.price,
      weight: item.weight,
      stockRakuten: item.stockRakuten,
      stockMakeshop: item.stockMakeshop,
      order: item.order,
      jancodeString: item.jancodeString,
      blocks: item.blocks,
      subBlocks: item.subBlocks ?? [],
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

  public async saveItems({ items }: SaveItemsProps): Promise<void> {
    console.log("SAVE ITEMS!", items)
    const prev = await this.chromeStorageClient.storageV3LocalGet()
    if (!prev) throw new Error("cake_v3 not found")

    const oldItems = Object.values(prev.items).sort((a, b) => a.order - b.order)
    const numOfItems = ItemCollectionRepository.getNumberOfItems(prev)
    const newItems = items
      .map((item, index) =>
        ItemCollectionRepository.entityToResource(item, numOfItems + index)
      )
      .map((itemValue) => ({
        ...itemValue,
        id: uuidv4(), // 既存のitemを上書きしない
      }))

    const merged = oldItems.concat(newItems)
    const sorted = merged.map((item, index) => ({
      ...item,
      order: index, // 一応orderを上書き
    }))
    const next: Storage_v3 = {
      selectedItemId: null,
      items: Object.fromEntries(sorted.map((item) => [item.id, item])),
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
      .map((item) => ItemCollectionRepository.resourceToEntity(item))
  }

  async clear(): Promise<void> {
    console.log("CLEAR STORAGE!")
    this.chromeStorageClient.storageV3LocalSet({
      items: {},
      selectedItemId: null,
    })
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
      subBlocks: entity.subBlocks.map(this.blockEntityToResource),
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
      subBlocks: [],
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
    const INVALID_BLOCK_VALUE = "invalid block value"
    switch (blockValue.type) {
      case "heading":
        if (!isHeadingBlockValue(blockValue.value))
          throw new Error(INVALID_BLOCK_VALUE)
        return {
          id,
          type: blockValue.type,
          value: blockValue.value,
        }
      case "text":
        if (!isTextBlockValue(blockValue.value))
          throw new Error(INVALID_BLOCK_VALUE)
        return {
          id,
          type: blockValue.type,
          value: blockValue.value,
        }
      case "image":
        if (!isImageBlockValue(blockValue.value))
          throw new Error(INVALID_BLOCK_VALUE)
        return {
          id,
          type: blockValue.type,
          value: blockValue.value,
        }
      case "table":
        if (!isTableBlockValue(blockValue.value))
          throw new Error(INVALID_BLOCK_VALUE)
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
