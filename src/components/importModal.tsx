import React, { useState, useRef } from "react"
import { Modal, Form, Button, Icon } from "react-bulma-components"
import { ImportItemsAppendUsecase } from "../usecase/import-items-append-usecase"
import { ImportItemsOverwriteUsecase } from "../usecase/import-items-overwrite-usecase"
import { ItemCollectionRepository } from "../infra/itemCollectionRepository"
import { ChromeStorageClient } from "../infra/chromeStorageClient"
import { JSONFileClient } from "../infra/json-file-client/json-file-client"
import { FileIOClient } from "../infra/file-io-client"

export type Props = {
  show: boolean
  setShow: (show: boolean) => void
  resetItemCollection: () => Promise<void>
}

const ImportModal = ({
  show,
  setShow,
  resetItemCollection,
}: Props): JSX.Element => {
  const [filename, setFilename] = useState<string | undefined>(undefined)
  const [overwrite, setOverwrite] = useState(false)
  const fileinput = useRef<HTMLInputElement | null>(null)

  const fileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilename(
      e.target.files?.length && e.target.files.length > 0
        ? e.target.files[0].name
        : undefined
    )
  }

  const close = () => {
    setFilename("")
    setShow(false)
  }

  const chromeStorageClient = new ChromeStorageClient()
  const itemCollectionRepository = new ItemCollectionRepository(
    chromeStorageClient
  )
  const jsonClient = new JSONFileClient()
  const fileIOClient = new FileIOClient()
  const importItemsAppend = new ImportItemsAppendUsecase(
    jsonClient,
    itemCollectionRepository,
    fileIOClient
  )
  const importItemsOverwrite = new ImportItemsOverwriteUsecase(
    jsonClient,
    itemCollectionRepository,
    fileIOClient
  )

  const _import = async () => {
    const files = fileinput?.current?.files
    if (!files || files.length === 0) {
      window.alert("ファイルが選択されていません")
      return
    }
    const file = files[0]
    if (overwrite) {
      await importItemsOverwrite.exec(file)
    } else {
      await importItemsAppend.exec(file)
    }
    await resetItemCollection()
    close()
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
                  accept=".json"
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
          <Button onClick={() => _import()} color="info">
            インポート
          </Button>
          <Button onClick={close}>キャンセル</Button>
        </Modal.Card.Foot>
      </Modal.Card>
    </Modal>
  )
}

export default ImportModal
