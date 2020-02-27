import React, { useEffect, useState } from "react"
import ReactDOM from "react-dom"
import styled from "styled-components"
import "react-bulma-components/dist/react-bulma-components.min.css"
import { Form, Button } from "react-bulma-components"
import { initialItem } from "./shopItem"
import { getChromeStorage } from "./plugins/chromeAPI"
import LoadingButton from "./components/loadingButton"

const Wrapper = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;

  .main {
    flex: 1 1 auto;
    padding: 0 20px 14px 20px;
  }
  .foooter {
    display: flex;
    justify-content: center;
    background-color: #efefef;
    font-size: 0.7em;
    color: #7a7a7a;
    padding: 8px;
  }

  .part {
    width: 100%;
    margin: 12px 0 16px 0;
  }
  .part-label {
    display: block;
    color: #7a7a7a;
    font-size: 0.7em;
  }

  .control {
    display: flex;
    flex-direction: column;

    label:first-of-type {
      margin-top: 4px;
    }
    label {
      margin-bottom: 8px;
      user-select: none;
    }
    input {
      margin-right: 4px;
    }
  }

  .buttons {
    display: flex;
    justify-content: space-between;
  }
`

export type CheckboxState = {
  all: boolean
  info: boolean
  stock: boolean
  descriptions: boolean
}

const checkedAll: CheckboxState = {
  all: true,
  info: true,
  stock: true,
  descriptions: true,
}

const unCheckedAll: CheckboxState = {
  all: false,
  info: false,
  stock: false,
  descriptions: false,
}

const Checkbox: React.FC<{
  name: keyof CheckboxState
  value: boolean
  onCheck: (name: keyof CheckboxState) => void
  disabled: boolean
}> = ({ name, value, onCheck, disabled, children }) => (
  <Form.Checkbox
    checked={value}
    onChange={() => {
      onCheck(name)
    }}
    disabled={disabled}
  >
    {children}
  </Form.Checkbox>
)

const Popup = () => {
  const [item, setItem] = useState(initialItem)
  const fetchItem = async () => {
    const { cakev2 } = await getChromeStorage()
    const { nowItemIndex, shopItems } = cakev2
    setItem(nowItemIndex === null ? initialItem : shopItems[nowItemIndex])
  }
  useEffect(() => {
    // on mounted
    fetchItem()
  }, [setItem])

  const [checkbox, setCheckbox] = useState(checkedAll)
  const check = (name: keyof CheckboxState) => {
    if (name === "all") {
      setCheckbox(checkbox.all ? unCheckedAll : checkedAll)
    } else {
      const result = {
        ...checkbox,
        [name]: !checkbox[name],
      }
      result.all = result.info && result.stock && result.descriptions
      setCheckbox(result)
    }
  }

  const autoFill = () =>
    new Promise<any>(resolve => {
      chrome.tabs.query(
        { active: true, windowId: chrome.windows.WINDOW_ID_CURRENT },
        result => {
          chrome.tabs.sendMessage(result[0].id, checkbox, response => {
            resolve(response)
          })
        }
      )
    })

  return (
    <Wrapper>
      <div className="main">
        <div className="part">
          <span className="part-label">選択された商品</span>
          <span>{item.id !== null ? item.name : "なし"}</span>
        </div>

        <div className="part control">
          <span className="part-label">入力する項目</span>
          <Checkbox
            name="all"
            value={checkbox.all}
            onCheck={check}
            disabled={item.id === null}
          >
            すべて
          </Checkbox>
          <Checkbox
            name="info"
            value={checkbox.info}
            onCheck={check}
            disabled={item.id === null}
          >
            商品名・価格・JAN
          </Checkbox>
          <Checkbox
            name="stock"
            value={checkbox.stock}
            onCheck={check}
            disabled={item.id === null}
          >
            在庫数
          </Checkbox>
          <Checkbox
            name="descriptions"
            value={checkbox.descriptions}
            onCheck={check}
            disabled={item.id === null}
          >
            商品説明
          </Checkbox>
        </div>

        <div className="buttons">
          <LoadingButton
            label="自動入力"
            color={"primary"}
            size={"small"}
            asyncfunc={autoFill}
            disabled={item.id === null}
          />
          <Button
            size={"small"}
            text={true}
            onClick={() => {
              chrome.runtime.openOptionsPage()
            }}
          >
            商品登録ページへ
          </Button>
        </div>
      </div>
      <div className="foooter">© cheesecake</div>
    </Wrapper>
  )
}

ReactDOM.render(<Popup />, document.getElementById("root"))
