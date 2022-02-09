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
    reset,
  } = useItemCollection(itemCollectionRepository)

  const resetItemCollection = async () => {
    await reset()
  }

  ////// info /////
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

  const handleInfoChange: Props["itemEditorProps"]["handleChange"] =
    useCallback(
      (key) => (e) => {
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
      blocks: mainBlock.blocks,
    })
  }

  const handleSaveItem = () => {
    update({
      itemInfo: itemInfoFormValue,
      blocks: mainBlock.blocks,
    })
  }

  const handleCopy = () => {
    duplicate()
  }

  const handleRemoveItem = () => {
    remove()
  }

  /////////////// block ///////////////
  const mainBlock = useCustomBlock()

  useEffect(() => {
    if (target) {
      mainBlock.initBlocks(target.blocks)
    } else {
      mainBlock.initBlocks([])
    }
  }, [target])

  return (
    <OptionsTemplate
      itemList={itemList}
      resetItemCollection={resetItemCollection}
      itemListProps={{
        onClickCreateButton: startCreate,
        createButtonDisabled: target === undefined,
        items: itemList.map((item) => ({
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
          // TODO: 削除時のconfirm
          visible: target !== undefined,
          onClick: handleRemoveItem,
        },
      }}
      mainBlocks={mainBlock.blocks.map((block) => ({
        block: block,
        update: mainBlock.updateBlock,
        remove: () => {
          mainBlock.removeBlock({ id: block.id })
        },
        moveUp: () => {
          mainBlock.moveBlock({ id: block.id, type: "relative", offset: -1 })
        },
        moveDown: () => {
          mainBlock.moveBlock({ id: block.id, type: "relative", offset: 1 })
        },
      }))}
      mainBlockEditorControllerProps={{
        addHeadingBlockButton: {
          onClick: () => {
            mainBlock.addBlock({ type: "heading" })
          },
        },
        addTextBlockButton: {
          onClick: () => {
            mainBlock.addBlock({ type: "text" })
          },
        },
        addImageBlockButton: {
          onClick: () => {
            mainBlock.addBlock({ type: "image" })
          },
        },
        addTableBlockButton: {
          onClick: () => {
            mainBlock.addBlock({ type: "table" })
          },
        },
      }}
    />
  )
}
