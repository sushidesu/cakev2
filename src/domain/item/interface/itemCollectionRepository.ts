import { ItemId } from "../itemId"
import { Item } from "../item"

export type CreateItemProps = {
  item: Item
}

export type SaveItemsProps = {
  items: Item[]
}

export type SaveItemProps = {
  id: ItemId
  item: Item
}

export type RemoveItemProps = {
  id: ItemId
}

export type SelectItemProps = {
  id: ItemId
}

export interface IItemCollectionRepository {
  getAllItems(): Promise<Item[]>
  getSelectedItemId(): Promise<ItemId | null>
  createItem(props: CreateItemProps): Promise<void>
  saveItem(props: SaveItemProps): Promise<void>
  saveItems(props: SaveItemsProps): Promise<void>
  removeItem(props: RemoveItemProps): Promise<void>
  clear(): Promise<void>
  unSelectItem(): Promise<void>
  selectItem(props: SelectItemProps): Promise<void>
}
