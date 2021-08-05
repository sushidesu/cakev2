import { Item } from "./item"
import { ItemId } from "./itemId"
import { Jancode } from "../jancode"
import { ItemInfoFormValue } from "./useItem"
import { stringToNumber } from "../../utils/stringToNumber"

export const formValueToEntity = ({
  id,
  info,
  blocks,
}: {
  id: ItemId
  info: ItemInfoFormValue
  blocks: []
}): Item => ({
  id,
  name: info.name,
  price: stringToNumber(info.price),
  weight: stringToNumber(info.weight),
  stockRakuten: stringToNumber(info.stockRakuten),
  stockMakeshop: stringToNumber(info.stockMakeshop),
  jancode: info.jancode !== "" ? Jancode.create(info.jancode) : undefined,
  blocks,
})
