import React, { useState, useEffect, useContext } from "react"
import { Modal, Form, Button } from "react-bulma-components"
import { ItemStore } from "./itemStore"
import { exportFile } from "../utils"

type Props = {
  show: boolean
  closeModal: () => void
}

const ExportModal: React.FC<Props> = ({ show, closeModal }) => {
  const {
    globalState: { shopItems },
  } = useContext(ItemStore)
  const [selectList, setSelectList] = useState<boolean[]>([])
  console.log(selectList)

  useEffect(() => {
    setSelectList(shopItems.map(_ => true))
  }, [shopItems])

  return (
    <Modal onClose={closeModal} show={show} closeOnBlur={true}>
      <Modal.Card>
        <Modal.Card.Head onClose={closeModal}>
          <Modal.Card.Title>商品エクスポート</Modal.Card.Title>
        </Modal.Card.Head>
        <Modal.Card.Body>
          <Form.Field>
            {shopItems.map((item, index) => (
              <Form.Control key={index}>
                <Form.Checkbox
                  onChange={() => {
                    setSelectList(prev =>
                      prev.map((flag, i) => (i === index ? !flag : flag))
                    )
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
          <Button onClick={() => exportFile()} color="info">
            エクスポート
          </Button>
          <Button onClick={closeModal}>キャンセル</Button>
        </Modal.Card.Foot>
      </Modal.Card>
    </Modal>
  )
}

export default ExportModal
