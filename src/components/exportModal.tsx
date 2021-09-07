import React, { useState, useEffect } from "react"
import clsx from "clsx"
import { Item } from "../domain/item/item"
import { ExportItemsUsecase } from "../usecase/export-tems-usecase"
import { JSONFileClient } from "../infra/json-file-client/json-file-client"
import { FileIOClient } from "../infra/file-io-client/file-io-client"
import { Button } from "./atom/Button"
import { Checkbox } from "./atom/CheckBox"
import { Modal } from "./Modal"

export type Props = {
  show: boolean
  closeModal: () => void
  itemList: Item[]
}

const ExportModal = ({ show, closeModal, itemList }: Props): JSX.Element => {
  const jsonClient = new JSONFileClient()
  const fileIOClient = new FileIOClient()
  const exportItemsUsecase = new ExportItemsUsecase(jsonClient, fileIOClient)

  const handleClickExport = () => {
    let items: Item[]
    if (checkAll) {
      items = itemList
    } else {
      items = itemList.filter((_, index) => selectedItemList[index])
    }
    exportItemsUsecase.exec(items)
  }

  const [checkAll, setCheckAll] = useState<boolean>(true)
  const [selectedItemList, setSelectedItemList] = useState<boolean[]>([])

  const setAll = (check: boolean) => {
    setSelectedItemList(itemList.map(() => check))
  }

  const handleClickCheckAll = () => {
    setCheckAll((prev) => {
      setAll(!prev)
      return !prev
    })
  }

  const handleClickItemCheckbox = (index: number) => () => {
    setSelectedItemList((prev) => {
      const next = prev.map((checked, i) => {
        if (i === index) {
          return !checked
        } else {
          return checked
        }
      })
      setCheckAll(next.every((checked) => checked))
      return next
    })
  }

  // item list との同期
  useEffect(() => {
    setSelectedItemList(itemList.map(() => true))
    setCheckAll(true)
  }, [itemList])

  return (
    <Modal
      title={"商品エクスポート"}
      onClickClose={closeModal}
      onClickBackground={closeModal}
      show={show}
      footer={
        <div>
          <Button onClick={handleClickExport} color="info">
            エクスポート
          </Button>
          <Button onClick={closeModal}>キャンセル</Button>
        </div>
      }
    >
      <div>
        <div className={clsx("field")}>
          <div className={clsx("control")}>
            <Checkbox
              name="all"
              onClick={handleClickCheckAll}
              checked={checkAll}
            >
              すべて
            </Checkbox>
          </div>
          {itemList.map((item, index) => (
            <div className={clsx("control")} key={item.id.value}>
              <Checkbox
                onClick={handleClickItemCheckbox(index)}
                checked={selectedItemList[index]}
              >
                {`${item.name}`}
              </Checkbox>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  )
}

export default ExportModal
