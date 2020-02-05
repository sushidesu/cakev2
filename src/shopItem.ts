export interface IShopItem {
  id: number
  name: string
  price: string
  weight: string
  stockRakuten: string
  stockMakeshop: string
  jancode: string
  descriptions: { title: string; body: string }[]
  details: { title: string; body: string }[]
}

export const initialItem: IShopItem = {
  id: null,
  name: "",
  price: "",
  weight: "",
  stockRakuten: "",
  stockMakeshop: "",
  jancode: "",
  descriptions: [],
  details: [],
}
