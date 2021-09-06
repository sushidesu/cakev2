import React, { useState, useEffect } from "react"
import { Modal, Form } from "react-bulma-components"
import { Item } from "../domain/item/item"
import { ExportItemsUsecase } from "../usecase/export-tems-usecase"
import { JSONFileClient } from "../infra/json-file-client/json-file-client"
import { FileIOClient } from "../infra/file-io-client/file-io-client"
import { Button } from "./atom/Button"

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
    <Modal onClose={closeModal} show={show} closeOnBlur={true}>
      <Modal.Card>
        <Modal.Card.Head onClose={closeModal}>
          <Modal.Card.Title>商品エクスポート</Modal.Card.Title>
        </Modal.Card.Head>
        <Modal.Card.Body>
          <Form.Field>
            <Form.Control>
              <Form.Checkbox onChange={handleClickCheckAll} checked={checkAll}>
                すべて
              </Form.Checkbox>
            </Form.Control>
            {itemList.map((item, index) => (
              <Form.Control key={item.id.value}>
                <Form.Checkbox
                  onChange={handleClickItemCheckbox(index)}
                  checked={selectedItemList[index]}
                >
                  {`  ${item.name}`}
                </Form.Checkbox>
              </Form.Control>
            ))}
          </Form.Field>
        </Modal.Card.Body>
        <Modal.Card.Foot>
          <Button onClick={handleClickExport} color="info">
            エクスポート
          </Button>
          <Button onClick={closeModal}>キャンセル</Button>
        </Modal.Card.Foot>
      </Modal.Card>
    </Modal>
  )
}

export default ExportModal
