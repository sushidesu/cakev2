import { ItemId } from "./itemId"
import { Jancode } from "../jancode"
import { CustomBlock } from "../block/block"
import { CreateNameOfCopyItem } from "./service/createNameOfCopyItem"
import { ItemInfoFormValue } from "./useItem"
import { convertFormValue } from "./convertFormValue"

export interface Item {
  id: ItemId
  name: string
  price: number
  weight: number
  stockRakuten: number
  stockMakeshop: number
  jancode: Jancode | undefined
  blocks: CustomBlock[]
}

export type CreateItemProps = {
  itemInfo: ItemInfoFormValue
  blocks: []
}

export const createItem = ({ itemInfo, blocks }: CreateItemProps): Item => {
  const id = ItemId.create()
  return {
    ...convertFormValue({ itemInfo, blocks }),
    id,
  }
}

export type CopyItemProps = {
  target: Item
  createNameOfCopyItem: CreateNameOfCopyItem
}

export const copyItem = ({
  target,
  createNameOfCopyItem,
}: CopyItemProps): Item => {
  const newId = ItemId.create()
  const newName = createNameOfCopyItem.exec(target.name)

  return {
    ...target,
    id: newId,
    name: newName,
  }
}

export type UpdateItemProps = {
  target: Item
  itemInfo: ItemInfoFormValue
  blocks: []
}

export const updateItem = ({
  target,
  itemInfo,
  blocks,
}: UpdateItemProps): Item => {
  return {
    ...convertFormValue({ itemInfo, blocks }),
    id: target.id,
  }
}
