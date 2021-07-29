import { useCallback, useState } from "react"
import { Item } from "../item/item"

type ItemInfo = Pick<
  Item,
  "name" | "price" | "weight" | "jancode" | "stockRakuten" | "stockMakeshop"
>
type ItemInfoFormValue = Record<keyof ItemInfo, string>

export interface UseItemInfo {
  setItemInfoFormValue: <T extends keyof ItemInfoFormValue>(props: {
    key: T
    value: ItemInfoFormValue[T]
  }) => void
  initFormValue: (value: ItemInfoFormValue) => void
  itemInfoFormValue: ItemInfoFormValue
}

export const useItemInfo = (): UseItemInfo => {
  const [itemInfoFormValue, setItemInfoFormValue] = useState<ItemInfoFormValue>(
    {
      name: "",
      price: "0",
      weight: "0",
      stockMakeshop: "0",
      stockRakuten: "0",
      jancode: "",
    }
  )
  console.log("form", itemInfoFormValue)

  const init = useCallback((value: ItemInfoFormValue) => {
    setItemInfoFormValue(value)
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
        if (prev) {
          return {
            ...prev,
            [key]: value,
          }
        } else {
          return prev
        }
      })
    },
    []
  )

  return {
    setItemInfoFormValue: update,
    initFormValue: init,
    itemInfoFormValue,
  }
}
