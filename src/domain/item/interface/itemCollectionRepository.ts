import { ItemId } from "../itemId"
import { Item } from "../item"

export type CreateItemProps = {
  item: Item
}

export type SaveItemProps = {
  id: ItemId
  item: Item
}

export type GetItemProps = {
  id: ItemId
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
  removeItem(props: RemoveItemProps): Promise<void>
  unSelectItem(): Promise<void>
  selectItem(props: SelectItemProps): Promise<void>
}
