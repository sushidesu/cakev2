import { InputError } from "../../utils/inputError"
import { ItemInfoFormValue } from "./itemInfo"
import { Jancode } from "../jancode"

type Validator = (value: string) => InputError

type ItemInfoValidators = {
  [key in keyof ItemInfoFormValue]: Validator
}

const stockValidator: Validator = value => {
  if (isEmpty(value)) {
    return {
      error: true,
      message: "在庫数を入力してください",
    }
  }
  return {
    error: false,
    message: "",
  }
}

export const validator: ItemInfoValidators = {
  name: value => {
    if (isEmpty(value)) {
      return {
        error: true,
        message: "商品名を入力してください",
      }
    }
    return {
      error: false,
      message: "",
    }
  },
  price: value => {
    if (isEmpty(value)) {
      return {
        error: true,
        message: "価格を入力してください",
      }
    }
    return {
      error: false,
      message: "",
    }
  },
  weight: value => {
    if (isEmpty(value)) {
      return {
        error: true,
        message: "重さを入力してください",
      }
    }
    return {
      error: false,
      message: "",
    }
  },
  stockRakuten: stockValidator,
  stockMakeshop: stockValidator,
  jancode: value => {
    if (value === "") {
      return {
        error: false,
        message: "",
      }
    }

    try {
      Jancode.validateLength(value)
    } catch (err) {
      return {
        error: true,
        message: `${value.length} / 13 JANコードは13文字である必要があります`,
      }
    }
    try {
      Jancode.validateHasOnlyDigits(value)
    } catch (err) {
      return {
        error: true,
        message: "半角数字のみを入力してください",
      }
    }
    try {
      Jancode.validateCheckDigit(value)
    } catch (err) {
      return {
        error: true,
        message: "正しくないJANコードです",
      }
    }

    return {
      error: false,
      message: "",
    }
  },
}

const isEmpty = (value: string): boolean => value === ""
