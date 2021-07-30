import React from "react"
import styled from "styled-components"
import { Container, Columns } from "react-bulma-components"
import Header from "../header"
import ItemList, { Props as ItemListProps } from "../itemList"
import ItemEditor, { Props as ItemEditorProps } from "../itemEditor"
import { Button } from "../Button"

export type Props = {
  controllerProps: {
    createButton: ButtonControlProps
    saveButton: ButtonControlProps
    copyButton: ButtonControlProps
    deleteButton: ButtonControlProps
  }
  itemListProps: ItemListProps
  itemEditorProps: ItemEditorProps
}

type ButtonControlProps = {
  visible?: boolean
  disabled?: boolean
  onClick?: () => void
}

const Wrapper = styled.div`
  margin: 0 10px;
  & > .container {
    margin-top: 20px;
  }
  .sidemenu {
    min-width: 230px;
  }
`
const StickyButtonsWrapper = styled.div`
  position: sticky;
  bottom: 0;
  background-color: white;
  display: flex;
  justify-content: space-between;
  padding: 40px 20px 20px;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    box-shadow: inset 0 -5px 5px #efefef;
    border-radius: 4px;
    width: 100%;
    height: 20px;
  }
  & button + button {
    margin-left: 15px;
  }
`

export function OptionsTemplate({
  itemListProps,
  itemEditorProps,
  controllerProps,
}: Props): JSX.Element {
  const { createButton, saveButton, copyButton, deleteButton } = controllerProps
  return (
    <Wrapper>
      <Header />
      <Container>
        <Columns className={"is-mobile"}>
          <Columns.Column size={3} className={"sidemenu"}>
            <ItemList {...itemListProps} />
          </Columns.Column>
          <Columns.Column>
            <ItemEditor {...itemEditorProps} />
            <StickyButtonsWrapper>
              <div>
                <Button {...createButton} color="primary">
                  新規登録
                </Button>
                <Button {...saveButton} color="info">
                  変更を保存
                </Button>
                <Button {...copyButton} color="primary" outlined>
                  コピーして追加
                </Button>
              </div>
              <div>
                <Button {...deleteButton} color="danger" outlined>
                  削除
                </Button>
              </div>
            </StickyButtonsWrapper>
          </Columns.Column>
        </Columns>
      </Container>
    </Wrapper>
  )
}
