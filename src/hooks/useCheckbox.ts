import { useState, useCallback } from "react"

export interface CheckboxItemProp {
  id: string
  label: string
}

type Checkbox = {
  id: string
  label: string
  checked: boolean
}

export interface UseCheckboxResponse {
  init: (items: CheckboxItemProp[]) => void
  handleClickCheckAll: () => void
  handleClickCheckbox: (id: string) => () => void
  checkboxes: Checkbox[]
  checkedAll: boolean
}

export const useCheckbox = (items: CheckboxItemProp[]): UseCheckboxResponse => {
  const [checkedAll, setCheckedAll] = useState(true)
  const [checkboxes, setCheckboxes] = useState<Checkbox[]>(
    items.map((item) => ({
      id: item.id,
      label: item.label,
      checked: true,
    }))
  )

  const handleClickCheckAll = useCallback(() => {
    setCheckedAll((prevCheckedAll) => {
      setCheckboxes((prev) =>
        prev.map((item) => ({
          ...item,
          checked: !prevCheckedAll,
        }))
      )
      return !prevCheckedAll
    })
  }, [])

  const handleClickCheckbox = useCallback(
    (id: string) => () => {
      setCheckboxes((prev) => {
        const next = prev.map((item) => ({
          ...item,
          checked: item.id === id ? !item.checked : item.checked,
        }))
        setCheckedAll(next.every((item) => item.checked))
        return next
      })
    },
    []
  )

  const init = useCallback((initItems: CheckboxItemProp[]) => {
    setCheckedAll(true)
    setCheckboxes(
      initItems.map((item) => ({
        id: item.id,
        label: item.label,
        checked: true,
      }))
    )
  }, [])

  return {
    init,
    handleClickCheckAll,
    handleClickCheckbox,
    checkboxes,
    checkedAll,
  }
}
