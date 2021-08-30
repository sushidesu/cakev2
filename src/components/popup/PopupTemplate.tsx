import React from "react"
import styled from "styled-components"
import { Button } from "react-bulma-components"
import { Checkbox, CheckboxState } from "./Checkbox"
import LoadingButton from "../loadingButton"
import { IShopItem } from "../../shopItem"

export type Props = {
  item: IShopItem
  checkbox: CheckboxState
  check: (name: keyof CheckboxState) => void
  autoFill: () => Promise<void>
}

export function PopupTemplate({
  item,
  checkbox,
  check,
  autoFill,
}: Props): JSX.Element {
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
