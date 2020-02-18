import React, { useEffect, useState } from "react"
import ReactDOM from "react-dom"
import styled from "styled-components"
import "react-bulma-components/dist/react-bulma-components.min.css"
import { Form, Button } from "react-bulma-components"
import { initialItem } from "./shopItem"
import { getChromeStorage } from "./plugins/chromeAPI"

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

const Popup = () => {
  const [item, setItem] = useState(initialItem)
  const fetchItem = async () => {
    const { cakev2 } = await getChromeStorage()
    const { nowItemIndex, shopItems } = cakev2
    setItem(nowItemIndex === null ? initialItem : shopItems[nowItemIndex])
  }
  useEffect(() => {
    console.log("effect")
    fetchItem()
  }, [setItem])

  return (
    <Wrapper>
      <div className="main">
        <div className="part">
          <span className="part-label">選択された商品</span>
          <span>{item.id !== null ? item.name : "なし"}</span>
        </div>

        <div className="part control">
          <span className="part-label">更新する項目</span>
          <Form.Checkbox>すべて</Form.Checkbox>
          <Form.Checkbox>基本情報</Form.Checkbox>
          <Form.Checkbox>在庫数</Form.Checkbox>
          <Form.Checkbox>商品詳細</Form.Checkbox>
        </div>

        <div className="buttons">
          <Button
            size={"small"}
            color={"primary"}
            onClick={() => {
              chrome.tabs.executeScript({
                file: "./content.bundle.js",
              })
            }}
          >
            自動入力
          </Button>
          <Button size={"small"} text={true}>
            商品登録ページへ
          </Button>
        </div>
      </div>
      <div className="foooter">© cheesecake</div>
    </Wrapper>
  )
}

ReactDOM.render(<Popup />, document.getElementById("root"))
