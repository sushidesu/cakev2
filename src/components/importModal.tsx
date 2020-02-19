import React, { useState, useRef } from "react"
import { Modal, Form, Button, Icon } from "react-bulma-components"

const ImportModal: React.FC<{
  show: boolean
  setShow: (show: boolean) => void
}> = ({ show, setShow }) => {
  const [filename, setFilename] = useState(undefined)
  const [overwrite, setOverwrite] = useState(false)
  const fileinput = useRef<HTMLInputElement>()

  const fileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilename(e.target.files.length > 0 ? e.target.files[0].name : undefined)
  }
  const importFile = () => {
    const files = fileinput.current.files
    if (files.length === 0) {
      window.alert("ファイルが選択されていません")
      return
    }
    console.log(files[0])
  }

  return (
    <Modal onClose={() => setShow(false)} show={show} closeOnBlur={true}>
      <Modal.Card>
        <Modal.Card.Head onClose={() => setShow(false)}>
          <Modal.Card.Title>商品リストインポート</Modal.Card.Title>
        </Modal.Card.Head>
        <Modal.Card.Body>
          <Form.Field>
            <div className="file has-name is-fullwidth">
              <label className="file-label">
                <input
                  onChange={fileSelect}
                  ref={fileinput}
                  className="file-input"
                  type="file"
                  name="resume"
                />
                <span className="file-cta">
                  <span className="file-icon">
                    <Icon icon="upload" />
                  </span>
                  <span className="file-label">ファイルを選択</span>
                </span>
                <span className="file-name">{filename}</span>
              </label>
            </div>
          </Form.Field>
          <Form.Field>
            <Form.Radio
              checked={!overwrite}
              onChange={() => setOverwrite(false)}
              name="importOption"
            >
              既存の商品リストに追加
            </Form.Radio>
          </Form.Field>
          <Form.Field>
            <Form.Radio
              checked={overwrite}
              onChange={() => setOverwrite(true)}
              name="importOption"
            >
              既存の商品リストを上書き
            </Form.Radio>
          </Form.Field>
        </Modal.Card.Body>
        <Modal.Card.Foot>
          <Button onClick={() => importFile()} color="info">
            インポート
          </Button>
          <Button onClick={() => setShow(false)}>キャンセル</Button>
        </Modal.Card.Foot>
      </Modal.Card>
    </Modal>
  )
}

export default ImportModal
