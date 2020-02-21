import { IShopItem, SingleItemFields } from "../shopItem"

export const validation = (
  key: keyof SingleItemFields,
  value: IShopItem[keyof SingleItemFields]
): string => {
  return ""
}

export const formIsInvalid = (formValue: IShopItem) => {
  const {
    name,
    price,
    weight,
    stockRakuten,
    stockMakeshop,
    jancode,
  } = formValue

  // required fields
  const required = [name, price, weight, stockRakuten, stockMakeshop].every(
    field => field !== ""
  )

  // jancode
  const jan = jancode === "" || isJancode(jancode)

  return ![required, jan].every(f => f)
}

const isJancode = (jan: string): boolean => {
  if (jan.length !== 13) {
    return false
  }

  const digits = jan.split("").map(n => parseInt(n))
  if (digits.some(n => isNaN(n))) {
    return false
  }

  const odd = digits.filter((_, i) => i % 2 === 1)
  const even = digits.filter((_, i) => i !== 12 && i % 2 === 0)

  let total = 0
  for (let i = 0; i < 6; i++) {
    total += even[i] + odd[i] * 3
  }

  const res = total % 10
  const checkd = digits[12]
  return res === 0 ? 0 === checkd : 10 - res === checkd
}
