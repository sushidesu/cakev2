import { Item } from "./item"
import { Jancode } from "../jancode"
import { CustomBlock } from "../customBlock/block"
import { ItemInfoFormValue } from "./interface/inputData"
import { stringToNumber } from "../../utils/stringToNumber"

export const convertFormValue = ({
  itemInfo,
  blocks,
}: {
  itemInfo: ItemInfoFormValue
  blocks: CustomBlock[]
}): Pick<
  Item,
  | "name"
  | "price"
  | "weight"
  | "stockRakuten"
  | "stockMakeshop"
  | "jancode"
  | "blocks"
> => ({
  name: itemInfo.name,
  price: stringToNumber(itemInfo.price),
  weight: stringToNumber(itemInfo.weight),
  stockRakuten: stringToNumber(itemInfo.stockRakuten),
  stockMakeshop: stringToNumber(itemInfo.stockMakeshop),
  jancode:
    itemInfo.jancode !== "" ? Jancode.create(itemInfo.jancode) : undefined,
  blocks,
})
