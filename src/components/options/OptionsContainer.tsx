import React, { useEffect, useCallback, useMemo } from "react"
import { useItemCollection } from "../../domain/item/useItem"
import { useItemInfo } from "../../domain/itemInfo/itemInfo"
import { OptionsTemplate, Props } from "./OptionsTemplate"
import { ItemCollectionRepository } from "../../infra/itemCollectionRepository"

export function OptionsContainer(): JSX.Element {
  const chromeStorageClient = new ItemCollectionRepository()
  const {
    selectedItemId,
    itemList,
    startCreate,
    select,
    create,
    update,
    remove,
    duplicate,
  } = useItemCollection(chromeStorageClient)
  const target = useMemo(
    () =>
      itemList.find(item => selectedItemId && item.id.equals(selectedItemId)),
    [itemList, selectedItemId]
  )

  const {
    itemInfoFormValue,
    itemInfoFormError,
    initFormValue,
    clearFormValue,
    setItemInfoFormValue,
    submitDisabled,
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
        jancode: target.jancode?.toString() ?? "",
      })
    } else {
      console.log("clear", target)
      clearFormValue()
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

  const handleCreateItem = () => {
    create({
      itemInfo: itemInfoFormValue,
      blocks: [],
    })
  }

  const handleSaveItem = () => {
    update({
      itemInfo: itemInfoFormValue,
      blocks: [],
    })
  }

  const handleCopy = () => {
    duplicate()
  }

  const handleRemoveItem = () => {
    remove()
  }

  return (
    <OptionsTemplate
      itemListProps={{
        onClickCreateButton: startCreate,
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
          disabled: submitDisabled,
          onClick: handleCreateItem,
        },
        saveButton: {
          visible: target !== undefined,
          disabled: submitDisabled,
          onClick: handleSaveItem,
        },
        copyButton: {
          visible: target !== undefined,
          onClick: handleCopy,
        },
        deleteButton: {
          visible: target !== undefined,
          onClick: handleRemoveItem,
        },
      }}
    />
  )
}
