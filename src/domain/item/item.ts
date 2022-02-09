import { ItemId } from "./itemId"
import { Jancode } from "../jancode"
import { CustomBlock } from "../customBlock/block"
import { ItemInfoFormValue } from "./interface/inputData"
import { CreateNameOfCopyItem } from "./service/createNameOfCopyItem"
import { convertFormValue } from "./convertFormValue"

export interface Item {
  id: ItemId
  name: string
  price: number
  weight: number
  stockRakuten: number
  stockMakeshop: number
  jancode: Jancode | undefined
  blocks: readonly CustomBlock[]
  subBlocks: readonly CustomBlock[]
}

export type CreateItemProps = {
  itemInfo: ItemInfoFormValue
  blocks: readonly CustomBlock[]
  subBlocks: readonly CustomBlock[]
}

export const createItem = ({
  itemInfo,
  blocks,
  subBlocks,
}: CreateItemProps): Item => {
  const id = ItemId.create()
  return {
    ...convertFormValue({ itemInfo, blocks, subBlocks }),
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
  blocks: readonly CustomBlock[]
  subBlocks: readonly CustomBlock[]
}

export const updateItem = ({
  target,
  itemInfo,
  blocks,
  subBlocks,
}: UpdateItemProps): Item => {
  return {
    ...convertFormValue({ itemInfo, blocks, subBlocks }),
    id: target.id,
  }
}
