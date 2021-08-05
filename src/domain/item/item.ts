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
  order: number
}

export const create = () => {
  // itemFactoryを削除
  // かわりにorderを作ってくれるserviceを作成
  // create() と copyItem() ではそれを使う
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
    order: target.order,
  }
}
