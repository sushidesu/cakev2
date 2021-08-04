import { useCallback, useMemo, useState } from "react"
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
  submitDisabled: boolean
}

const INITIAL_VALUES: ItemInfoFormValue = {
  name: "",
  price: "0",
  weight: "0",
  stockMakeshop: "0",
  stockRakuten: "0",
  jancode: "",
}
const INITIAL_ERROR: InputError = {
  error: false,
  message: "",
}
const INITIAL_ERRORS: ItemInfoFormError = {
  name: INITIAL_ERROR,
  price: INITIAL_ERROR,
  weight: INITIAL_ERROR,
  stockMakeshop: INITIAL_ERROR,
  stockRakuten: INITIAL_ERROR,
  jancode: INITIAL_ERROR,
}

export const useItemInfo = (): UseItemInfo => {
  const [itemInfoFormValue, setItemInfoFormValue] = useState<ItemInfoFormValue>(
    INITIAL_VALUES
  )
  const [itemInfoFormError, setItemInfoFormError] = useState<ItemInfoFormError>(
    INITIAL_ERRORS
  )
  console.log("form", itemInfoFormValue)

  const init = useCallback((value: ItemInfoFormValue) => {
    setItemInfoFormValue(value)
    setItemInfoFormError(validate(value))
  }, [])

  const clear = useCallback(() => {
    setItemInfoFormValue(INITIAL_VALUES)
    setItemInfoFormError(INITIAL_ERRORS)
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

  const submitDisabled = useMemo(() => {
    return Object.values(validate(itemInfoFormValue)).some(input => input.error)
  }, [itemInfoFormValue])

  return {
    setItemInfoFormValue: update,
    initFormValue: init,
    clearFormValue: clear,
    itemInfoFormValue,
    itemInfoFormError,
    submitDisabled,
  }
}

const validate = (formValue: ItemInfoFormValue): ItemInfoFormError => {
  return {
    name: validator.name(formValue.name),
    price: validator.price(formValue.price),
    weight: validator.weight(formValue.weight),
    stockRakuten: validator.stockRakuten(formValue.stockRakuten),
    stockMakeshop: validator.stockMakeshop(formValue.stockMakeshop),
    jancode: validator.jancode(formValue.jancode),
  }
}
