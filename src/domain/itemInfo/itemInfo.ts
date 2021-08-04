import { useCallback, useState } from "react"
import { Item } from "../item/item"
import { InputError } from "../../utils/inputError"
import { validator } from "./validator"

type ItemInfo = Pick<
  Item,
  "name" | "price" | "weight" | "jancode" | "stockRakuten" | "stockMakeshop"
>
export type ItemInfoFormValue = Record<keyof ItemInfo, string>
export type ItemInfoFormError = {
  [key in keyof ItemInfoFormValue]: InputError
}

export interface UseItemInfo {
  setItemInfoFormValue: <T extends keyof ItemInfoFormValue>(props: {
    key: T
    value: ItemInfoFormValue[T]
  }) => void
  initFormValue: (value: ItemInfoFormValue) => void
  clearFormValue: () => void
  itemInfoFormValue: ItemInfoFormValue
  itemInfoFormError: ItemInfoFormError
}

const INITIAL_VALUES: ItemInfoFormValue = {
  name: "",
  price: "0",
  weight: "0",
  stockMakeshop: "0",
  stockRakuten: "0",
  jancode: "",
}

export const useItemInfo = (): UseItemInfo => {
  const [itemInfoFormValue, setItemInfoFormValue] = useState<ItemInfoFormValue>(
    INITIAL_VALUES
  )
  const initialError: InputError = {
    error: false,
    message: "",
  }
  const [itemInfoFormError, setItemInfoFormError] = useState<ItemInfoFormError>(
    {
      name: initialError,
      price: initialError,
      weight: initialError,
      stockMakeshop: initialError,
      stockRakuten: initialError,
      jancode: initialError,
    }
  )
  console.log("form", itemInfoFormValue)

  const init = useCallback((value: ItemInfoFormValue) => {
    setItemInfoFormValue(value)
  }, [])

  const clear = useCallback(() => {
    setItemInfoFormValue(INITIAL_VALUES)
  }, [])

  const update = useCallback(
    <T extends keyof ItemInfoFormValue>({
      key,
      value,
    }: {
      key: T
      value: ItemInfoFormValue[T]
    }) => {
      setItemInfoFormValue(prev => {
        return {
          ...prev,
          [key]: value,
        }
      })
      setItemInfoFormError(prev => {
        return {
          ...prev,
          [key]: validator[key](value),
        }
      })
    },
    []
  )

  return {
    setItemInfoFormValue: update,
    initFormValue: init,
    clearFormValue: clear,
    itemInfoFormValue,
    itemInfoFormError,
  }
}
