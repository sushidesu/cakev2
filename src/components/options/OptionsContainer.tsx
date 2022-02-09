import React, { useEffect, useCallback } from "react"
import { useItemCollection } from "../../domain/item/useItem"
import { useItemInfo } from "../../domain/itemInfo/itemInfo"
import { OptionsTemplate, Props } from "./OptionsTemplate"
import { ItemCollectionRepository } from "../../infra/itemCollectionRepository"
import { ChromeStorageClient } from "../../infra/chromeStorageClient"
import { useCustomBlock } from "../../domain/customBlock/useCustomBlock"
import { useBlockHandlers } from "../../hooks/util/useBlockHandlers"

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

  /////////////// block (main) ///////////////
  const mainBlock = useCustomBlock()
  const mainBlockHandlers = useBlockHandlers(mainBlock)

  useEffect(() => {
    if (target) {
      mainBlock.initBlocks(target.blocks)
    } else {
      mainBlock.initBlocks([])
    }
  }, [target, mainBlock.initBlocks])

  /////////////// block (sub) ///////////////
  const subBlock = useCustomBlock()
  const subBlockHandlers = useBlockHandlers(subBlock)

  useEffect(() => {
    if (target) {
      subBlock.initBlocks(target.subBlocks)
    } else {
      subBlock.initBlocks([])
    }
  }, [target, subBlock.initBlocks])

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
      mainBlocks={mainBlockHandlers.blocks}
      mainBlockEditorControllerProps={{
        addHeadingBlockButton: {
          onClick: mainBlockHandlers.onAddHeadingClick,
        },
        addTextBlockButton: {
          onClick: mainBlockHandlers.onAddTextClick,
        },
        addImageBlockButton: {
          onClick: mainBlockHandlers.onAddImageClick,
        },
        addTableBlockButton: {
          onClick: mainBlockHandlers.onAddTableClick,
        },
      }}
      subBlocks={subBlockHandlers.blocks}
      subBlockEditorControllerProps={{
        addHeadingBlockButton: {
          onClick: subBlockHandlers.onAddHeadingClick,
        },
        addTextBlockButton: {
          onClick: subBlockHandlers.onAddTextClick,
        },
        addImageBlockButton: {
          onClick: subBlockHandlers.onAddImageClick,
        },
        addTableBlockButton: {
          onClick: subBlockHandlers.onAddTableClick,
        },
      }}
    />
  )
}
