export interface Storage_v2 {
  shopItems: IShopItemV2[]
  nowItemIndex: number
}

export interface IShopItemV2 {
  id: number
  name: string
  price: string
  weight: string
  stockRakuten: string
  stockMakeshop: string
  jancode: string
  imageURL: string
  descriptions: ItemText[]
  details: ItemText[]
}

export interface ItemText {
  index: number
  title: string
  body: string
}
