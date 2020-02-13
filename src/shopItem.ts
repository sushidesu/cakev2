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

export const initialItem: IShopItem = {
  id: null,
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
