import { ItemId } from "./itemId"
import { Jancode } from "../jancode"
import { CustomBlock } from "../block/block"
import { CreateNameOfCopyItem } from "./service/createNameOfCopyItem"

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
