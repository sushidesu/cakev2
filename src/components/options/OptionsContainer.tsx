import React, { useEffect, useCallback, useMemo } from "react"
import { useItemCollection } from "../../domain/item/useItem"
import { useItemInfo } from "../../domain/itemInfo/itemInfo"
import { OptionsTemplate, Props } from "./OptionsTemplate"

export function OptionsContainer(): JSX.Element {
  const { selectedItemId, itemList, select, create } = useItemCollection()
  const target = useMemo(
    () =>
      itemList.find(item => selectedItemId && item.id.equals(selectedItemId)),
    [itemList, selectedItemId]
  )

  const {
    itemInfoFormValue,
    itemInfoFormError,
    initFormValue,
    setItemInfoFormValue,
  } = useItemInfo()

  useEffect(() => {
    if (target) {
      console.log("init", target)
      initFormValue({
        name: target.name,
        price: target.price.toString(),
        weight: target.weight.toString(),
        stockRakuten: target.stockRakuten.toString(),
        stockMakeshop: target.stockMakeshop.toString(),
        jancode: target.jancode.toString(),
      })
    }
  }, [target])

  const handleInfoChange: Props["itemEditorProps"]["handleChange"] = useCallback(
    key => e => {
      setItemInfoFormValue({
        key,
        value: e.target.value,
      })
    },
    [setItemInfoFormValue]
  )

  return (
    <OptionsTemplate
      itemListProps={{
        onClickCreateButton: create,
        createButtonDisabled: selectedItemId === null,
        items: itemList.map(item => ({
          id: item.id.value,
          name: item.name,
          selected: selectedItemId ? item.id.equals(selectedItemId) : false,
          onClick: () => {
            select(item.id)
          },
        })),
      }}
      itemEditorProps={{
        editTargetInfo: itemInfoFormValue,
        formError: itemInfoFormError,
        handleChange: handleInfoChange,
      }}
      controllerProps={{
        createButton: {
          visible: target === undefined,
        },
        saveButton: {
          visible: target !== undefined,
        },
        copyButton: {
          visible: target !== undefined,
        },
        deleteButton: {
          visible: target !== undefined,
        },
      }}
    />
  )
}
