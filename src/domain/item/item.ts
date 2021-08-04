import { ItemId } from "./itemId"
import { Jancode } from "../jancode"
import { CustomBlock } from "../block/block"

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
