import React, { useEffect } from "react"
import clsx from "clsx"
import { Item } from "../domain/item/item"
import { ExportItemsUsecase } from "../usecase/export-items-usecase"
import { JSONFileClient } from "../infra/json-file-client/json-file-client"
import { FileIOClient } from "../infra/file-io-client/file-io-client"
import { Button } from "./atom/Button"
import { Checkbox } from "./atom/CheckBox"
import { Modal } from "./Modal"
import { useCheckbox } from "../hooks/useCheckbox"

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
    if (checkedAll) {
      items = itemList
    } else {
      items = itemList.filter((item) => {
        const targetCheckbox = checkboxes.find(
          (checkbox) => checkbox.id === item.id.value
        )
        return targetCheckbox?.checked
      })
    }
    exportItemsUsecase.exec(items)
  }

  const {
    init,
    checkboxes,
    handleClickCheckbox,
    checkedAll,
    handleClickCheckAll,
  } = useCheckbox(
    itemList.map((item) => ({
      id: item.id.value,
      label: item.name,
    }))
  )

  useEffect(() => {
    init(
      itemList.map((item) => ({
        id: item.id.value,
        label: item.name,
      }))
    )
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
              onChange={handleClickCheckAll}
              checked={checkedAll}
            >
              すべて
            </Checkbox>
          </div>
          {checkboxes.map((checkbox) => {
            return (
              <div className={clsx("control")} key={checkbox.id}>
                <Checkbox
                  onChange={handleClickCheckbox(checkbox.id)}
                  checked={checkbox.checked}
                >
                  {`${checkbox.label}`}
                </Checkbox>
              </div>
            )
          })}
        </div>
      </div>
    </Modal>
  )
}

export default ExportModal
