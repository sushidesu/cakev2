import { IShopItem } from "../shopItem"

export const KEY_VERSION_2 = "cakev2"

export interface Storage_v2 {
  shopItems: IShopItem[]
  nowItemIndex: number
}

export const KEY_VERSION_3 = "cakev3"

export interface Storage_v3 {
  items: {
    [id: string]: IShopItem
  }
}
