import React, { useEffect, useCallback } from "react"
import { useItemCollection } from "../../domain/item/useItem"
import { useItemInfo } from "../../domain/itemInfo/itemInfo"
import { OptionsTemplate, Props } from "./OptionsTemplate"
import { ItemCollectionRepository } from "../../infra/itemCollectionRepository"
import { ChromeStorageClient } from "../../infra/chromeStorageClient"
import { useCustomBlock } from "../../domain/customBlock/useCustomBlock"

export function OptionsContainer(): JSX.Element {
  const chromeStorageClient = new ChromeStorageClient()
  const itemCollectionRepository = new ItemCollectionRepository(
    chromeStorageClient
  )
  const {
    target,
    itemList,
    startCreate,
    select,
    create,
    update,
    remove,
    duplicate,
  } = useItemCollection(itemCollectionRepository)

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

  /////////////// block ///////////////
  const {
    blocks,
    addBlock,
    updateBlock,
    moveBlock,
    removeBlock,
    handleSubmit,
  } = useCustomBlock()

  return (
    <OptionsTemplate
      itemListProps={{
        onClickCreateButton: startCreate,
        createButtonDisabled: target === undefined,
        items: itemList.map(item => ({
          id: item.id.value,
          name: item.name,
          selected: target ? item.id.equals(target.id) : false,
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
      blocks={blocks.map(block => ({
        block: block,
        update: updateBlock,
        remove: () => {
          removeBlock({ id: block.id })
        },
        moveUp: () => {
          moveBlock({ id: block.id, type: "relative", offset: -1 })
        },
        moveDown: () => {
          moveBlock({ id: block.id, type: "relative", offset: 1 })
        },
      }))}
      blockEditorControllerProps={{
        addHeadingBlockButton: {
          onClick: () => {
            addBlock({ type: "heading" })
          },
        },
        addTextBlockButton: {
          onClick: () => {
            addBlock({ type: "text" })
          },
        },
        addImageBlockButton: {
          onClick: () => {
            addBlock({ type: "image" })
          },
        },
        addTableBlockButton: {
          onClick: () => {
            addBlock({ type: "table" })
          },
        },
      }}
    />
  )
}
