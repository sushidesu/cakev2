export interface IShopItem {
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

export type ItemText = {
  index: number
  title: string
  body: string
}

export type MultipleItemFields = Pick<IShopItem, "descriptions" | "details">

export type SingleItemFields = Omit<IShopItem, keyof MultipleItemFields | "id">

export const initialItem: IShopItem = {
  id: 0,
  name: "",
  price: "",
  weight: "",
  stockRakuten: "",
  stockMakeshop: "",
  jancode: "",
  imageURL: "",
  descriptions: [],
  details: [],
}
