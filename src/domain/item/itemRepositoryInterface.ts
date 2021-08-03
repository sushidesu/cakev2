import { ItemId } from "./itemId"
import { Item } from "./item"

export type SaveItemProps = {
  id: ItemId
  item: Item
}

export type GetItemProps = {
  id: ItemId
}

export interface ItemRepositoryInterface {
  saveItem(props: SaveItemProps): Promise<void>
  getItem(props: GetItemProps): Promise<Item | undefined>
}
