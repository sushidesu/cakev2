export interface IShopItem {
  id: number
  name: string
  price: string
  weight: string
  stockRakuten: string
  stockMakeshop: string
  jancode: string
  descriptions: ItemText[]
  details: ItemText[]
}

export type ItemText = {
  index: number
  title: string
  body: string
}

export const initialItem: IShopItem = {
  id: null,
  name: "",
  price: "",
  weight: "",
  stockRakuten: "",
  stockMakeshop: "",
  jancode: "",
  descriptions: [{ title: "", body: "", index: 0}],
  details: [{ title: "", body: "", index: 0 }],
}
