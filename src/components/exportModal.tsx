import React, { useState, useEffect, useContext } from "react"
import { Modal, Form, Button } from "react-bulma-components"
import { GlobalState, ItemStore } from "./itemStore"
import { exportFile } from "../utils"

type Props = {
  show: boolean
  closeModal: () => void
}

const ExportModal: React.FC<Props> = ({ show, closeModal }) => {
  const { globalState } = useContext(ItemStore)
  const { shopItems } = globalState
  const [checkAll, setCheckAll] = useState<boolean>(true)
  const [selectList, setSelectList] = useState<boolean[]>([])

  const generateList = (checked: boolean) => shopItems.map(_ => checked)
  const exportState: GlobalState = {
    ...globalState,
    shopItems: shopItems.filter((_, index) => selectList[index]),
  }

  useEffect(() => {
    setSelectList(generateList(true))
    setCheckAll(true)
  }, [shopItems, setSelectList, setCheckAll])

  return (
    <Modal onClose={closeModal} show={show} closeOnBlur={true}>
      <Modal.Card>
        <Modal.Card.Head onClose={closeModal}>
          <Modal.Card.Title>商品エクスポート</Modal.Card.Title>
        </Modal.Card.Head>
        <Modal.Card.Body>
          <Form.Field>
            <Form.Control>
              <Form.Checkbox
                onChange={() => {
                  setCheckAll(prev => {
                    setSelectList(generateList(!prev))
                    return !prev
                  })
                }}
                checked={checkAll}
              >
                すべて
              </Form.Checkbox>
            </Form.Control>
            {shopItems.map((item, index) => (
              <Form.Control key={index}>
                <Form.Checkbox
                  onChange={() => {
                    setSelectList(prev => {
                      const newList = prev.map((flag, i) =>
                        i === index ? !flag : flag
                      )
                      setCheckAll(newList.every(checked => checked))
                      return newList
                    })
                  }}
                  checked={selectList[index]}
                >
                  {`  ${item.name}`}
                </Form.Checkbox>
              </Form.Control>
            ))}
          </Form.Field>
        </Modal.Card.Body>
        <Modal.Card.Foot>
          <Button onClick={() => exportFile(exportState)} color="info">
            エクスポート
          </Button>
          <Button onClick={closeModal}>キャンセル</Button>
        </Modal.Card.Foot>
      </Modal.Card>
    </Modal>
  )
}

export default ExportModal
