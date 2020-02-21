import { IShopItem, SingleItemFields } from "../shopItem"

export const validation = (
  key: keyof SingleItemFields,
  value: IShopItem[keyof SingleItemFields]
): string => {
  switch (key) {
    case "name":
      return nameValidation(value)

    case "price":
      return priceValidation(value)

    case "weight":
      return weightValidation(value)

    case "stockRakuten":
      return stockValidation(value)

    case "stockMakeshop":
      return stockValidation(value)

    case "jancode":
      return jancodeValidation(value)

    case "imageURL":
      return ""
  }
}

const nameValidation = (name: string): string => {
  if (name === "") return "商品名を入力してください"
  return ""
}

const priceValidation = (price: string): string => {
  if (price === "") return "価格を入力してください"
  return ""
}

const weightValidation = (weight: string): string => {
  if (weight === "") return "価格を入力してください"
  return ""
}

const stockValidation = (stock: string): string => {
  if (stock === "") return "在庫数を入力してください"
  return ""
}

const jancodeValidation = (jan: string): string => {
  if (jan === "") {
    return ""
  } else if (isJancode(jan)) {
    return ""
  } else {
    return "正しくないJANコードです"
  }
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
