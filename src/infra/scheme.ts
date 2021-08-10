import { CustomBlock } from "../domain/customBlock/block"
import { IShopItem } from "../shopItem"

export const KEY_VERSION_2 = "cakev2"

export interface Storage_v2 {
  shopItems: IShopItem[]
  nowItemIndex: number
}

export const KEY_VERSION_3 = "cakev3"

export interface BlockValue {
  id: string
  type: string
  value: any
}
export interface ItemValue {
  id: string
  name: string
  price: number
  weight: number
  stockRakuten: number
  stockMakeshop: number
  jancodeString: string
  blocks: BlockValue[]
  order: number
}

export interface Storage_v3 {
  selectedItemId: string | null
  items: {
    [id: string]: ItemValue
  }
}
