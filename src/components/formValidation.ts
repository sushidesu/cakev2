import { IShopItem } from "../shopItem"

export const formIsInvalid = (formValue: IShopItem) => {
  // required fields
  const { name, price, weight, stockRakuten, stockMakeshop } = formValue
  const required = [name, price, weight, stockRakuten, stockMakeshop]
    .every(field => field !== "")

  return ![required].every(f => f)
}
