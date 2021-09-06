import React from "react"
import styled from "styled-components"
import { CheckboxForPopup, CheckboxState } from "./CheckboxForPopup"
import { Button } from "../atom/Button"
import { LoadingButton } from "../molecule/loadingButton"

export type Props = {
  itemName: string | undefined
  checkbox: CheckboxState
  check: (name: keyof CheckboxState) => void
  submitButtonProps: {
    loadingStatus: "default" | "loading" | "loaded"
    disabled: boolean
    onClick?: () => void
  }
}

export function PopupTemplate({
  itemName,
  checkbox,
  check,
  submitButtonProps,
}: Props): JSX.Element {
  const noItemSelected = itemName === undefined
  return (
    <Wrapper>
      <div className="main">
        <div className="part">
          <span className="part-label">選択された商品</span>
          <span>{itemName ?? "なし"}</span>
        </div>

        <div className="part control">
          <span className="part-label">入力する項目</span>
          <CheckboxForPopup
            name="all"
            value={checkbox.all}
            onCheck={check}
            disabled={noItemSelected}
          >
            すべて
          </CheckboxForPopup>
          <CheckboxForPopup
            name="info"
            value={checkbox.info}
            onCheck={check}
            disabled={noItemSelected}
          >
            商品名・価格・JAN
          </CheckboxForPopup>
          <CheckboxForPopup
            name="stock"
            value={checkbox.stock}
            onCheck={check}
            disabled={noItemSelected}
          >
            在庫数
          </CheckboxForPopup>
          <CheckboxForPopup
            name="descriptions"
            value={checkbox.descriptions}
            onCheck={check}
            disabled={noItemSelected}
          >
            商品説明
          </CheckboxForPopup>
        </div>

        <div className="buttons">
          <LoadingButton
            color={"primary"}
            size={"small"}
            disabled={submitButtonProps.disabled}
            loadingStatus={submitButtonProps.loadingStatus}
            onClick={submitButtonProps.onClick}
          >
            自動入力
          </LoadingButton>
          <Button
            size={"small"}
            color="text"
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
