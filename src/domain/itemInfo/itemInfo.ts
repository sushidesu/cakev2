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
  itemInfoFormValue: ItemInfoFormValue | undefined
}

export const useItemInfo = (): UseItemInfo => {
  const [itemInfoFormValue, setItemInfoFormValue] = useState<
    ItemInfoFormValue | undefined
  >()

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
      setItemInfoFormValue(prev => ({
        ...prev,
        [key]: value,
      }))
    },
    []
  )

  return {
    setItemInfoFormValue: update,
    initFormValue: init,
    itemInfoFormValue,
  }
}
