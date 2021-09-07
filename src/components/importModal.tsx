import React, { useState, useRef } from "react"
import clsx from "clsx"
import { Form, Icon } from "react-bulma-components"
import { ImportItemsAppendUsecase } from "../usecase/import-items-append-usecase"
import { ImportItemsOverwriteUsecase } from "../usecase/import-items-overwrite-usecase"
import { ItemCollectionRepository } from "../infra/itemCollectionRepository"
import { ChromeStorageClient } from "../infra/chromeStorageClient"
import { JSONFileClient } from "../infra/json-file-client/json-file-client"
import { FileIOClient } from "../infra/file-io-client/file-io-client"
import { useAlertContext } from "../contexts/alert/alertContext"
import { Button } from "./atom/Button"
import { Modal } from "./Modal"

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

  const { showAlert } = useAlertContext()
  const _import = async () => {
    try {
      const files = fileinput?.current?.files
      if (!files || files.length === 0) {
        window.alert("ファイルが選択されていません")
        return
      }
      const file = files[0]
      if (overwrite) {
        if (
          !window.confirm(
            "現在登録されている商品は全て消去されます。よろしいですか？"
          )
        ) {
          close()
          showAlert({
            type: "error",
            message: "インポートをキャンセルしました。",
          })
          return
        }
        await importItemsOverwrite.exec(file)
      } else {
        await importItemsAppend.exec(file)
      }
      await resetItemCollection()
      close()
      const message = overwrite ? "上書きしました。" : "追加しました。"
      showAlert({ type: "success", message })
    } catch (err) {
      showAlert({ type: "error", message: err.message })
    }
  }

  return (
    <Modal
      show={show}
      title={"商品リストインポート"}
      onClickClose={() => setShow(false)}
      onClickBackground={() => setShow(false)}
      footer={
        <div>
          <Button onClick={_import} color="info">
            インポート
          </Button>
          <Button onClick={close}>キャンセル</Button>
        </div>
      }
    >
      <div>
        <div className={clsx("field")}>
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
        </div>
        <div className={clsx("field")}>
          <Form.Radio
            checked={!overwrite}
            onChange={() => setOverwrite(false)}
            name="importOption"
          >
            既存の商品リストに追加
          </Form.Radio>
        </div>
        <div className={clsx("field")}>
          <Form.Radio
            checked={overwrite}
            onChange={() => setOverwrite(true)}
            name="importOption"
          >
            既存の商品リストを上書き
          </Form.Radio>
        </div>
      </div>
    </Modal>
  )
}

export default ImportModal
