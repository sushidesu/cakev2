import React from "react"
import styled from "styled-components"
import { Button, Level } from "react-bulma-components"
import { IShopItem } from "../shopItem"
import { GlobalDispatch } from "./itemStore"

const FormButtons: React.FC<{
  formValues: IShopItem
  setGlobalState: GlobalDispatch
  isInvalid: boolean
}> = ({ formValues, setGlobalState, isInvalid }) => (
  <StickyButtons>
    <Level>
      <Level.Side align="left">
        <Button
          color={formValues.id === null ? "primary" : "info"}
          onClick={() => setGlobalState({ type: "update", item: formValues })}
          disabled={isInvalid}
        >
          {formValues.id === null ? "新規登録" : "変更を保存"}
        </Button>
        {formValues.id !== null && (
          <Button
            color={"primary"}
            outlined={true}
            onClick={() =>
              setGlobalState({ type: "duplicate", index: formValues.id })
            }
          >
            コピーして追加
          </Button>
        )}
      </Level.Side>

      <Level.Side align="right">
        {formValues.id !== null && (
          <Button
            color={"danger"}
            outlined={true}
            className="is-right"
            onClick={() => {
              if (
                window.confirm(
                  `「${formValues.name}」を削除します。よろしいですか？`
                )
              ) {
                setGlobalState({ type: "delete", index: formValues.id })
              }
            }}
          >
            削除
          </Button>
        )}
      </Level.Side>
    </Level>
  </StickyButtons>
)

const StickyButtons: React.FC = ({ children }) => (
  <StickyButtonsWrapper>
    <div className={"innerShadow"}></div>
    <div className={"buttons"}>{children}</div>
  </StickyButtonsWrapper>
)

const StickyButtonsWrapper = styled.div`
  position: sticky;
  bottom: 0;

  .innerShadow {
    box-shadow: inset 0 -5px 5px #efefef;
    border-radius: 4px;
    width: 100%;
    height: 20px;
  }
  .buttons {
    background-color: #fff;
    padding: 20px 0;
  }
  .level {
    width: 100%;
  }
  button {
    margin: 0 15px;
  }
`

export default FormButtons
