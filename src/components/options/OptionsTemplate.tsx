import React from "react"
import styled from "styled-components"
import { Container, Columns } from "react-bulma-components"
import Header from "../header"
import ItemList, { Props as ItemListProps } from "../itemList"
import ItemEditor, { Props as ItemEditorProps } from "../itemEditor"
import { Button } from "../Button"
import { CustomBlock } from "../../domain/customBlock/block"
import { BlockEditorProps, BlockEditor } from "../editor/BlockEditor"
import { Item } from "../../domain/item/item"

export type Props = {
  itemList: Item[]
  resetItemCollection: () => Promise<void>
  controllerProps: {
    createButton: ButtonControlProps
    saveButton: ButtonControlProps
    copyButton: ButtonControlProps
    deleteButton: ButtonControlProps
  }
  itemListProps: ItemListProps
  itemEditorProps: ItemEditorProps
  blocks: BlockEditorProps<CustomBlock>[]
  blockEditorControllerProps: {
    addHeadingBlockButton: ButtonControlProps
    addTextBlockButton: ButtonControlProps
    addImageBlockButton: ButtonControlProps
    addTableBlockButton: ButtonControlProps
  }
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

const BlockEditorController = styled.div`
  margin-top: 2em;
  display: flex;
  & > .button + .button {
    margin-left: 1em;
  }
`

const Spacer = styled.div`
  margin: 0 0.5em;
`

const StickyButtonsWrapper = styled.div`
  margin-top: 3em;
  position: sticky;
  bottom: 0;
  background-color: white;
  display: flex;
  justify-content: space-between;
  padding: 20px;

  &:before {
    content: "";
    position: absolute;
    top: -20px;
    left: 0;
    box-shadow: inset 0 -5px 5px #efefef;
    background-color: transparent;
    border-radius: 4px;
    width: 100%;
    height: 20px;
  }
  & button + button {
    margin-left: 15px;
  }
`

export function OptionsTemplate({
  itemList,
  resetItemCollection,
  itemListProps,
  itemEditorProps,
  controllerProps,
  blocks,
  blockEditorControllerProps,
}: Props): JSX.Element {
  const { createButton, saveButton, copyButton, deleteButton } = controllerProps
  const {
    addHeadingBlockButton,
    addTextBlockButton,
    addImageBlockButton,
    addTableBlockButton,
  } = blockEditorControllerProps
  return (
    <Wrapper>
      <Header itemList={itemList} resetItemCollection={resetItemCollection} />
      <Container>
        <Columns className={"is-mobile"}>
          <Columns.Column size={3} className={"sidemenu"}>
            <ItemList {...itemListProps} />
          </Columns.Column>
          <Columns.Column>
            <Spacer>
              <ItemEditor {...itemEditorProps} />
            </Spacer>
            <hr />
            <Spacer>
              <div>
                {blocks.map(block => (
                  <BlockEditor key={block.block.id.value} {...block} />
                ))}
              </div>
              <BlockEditorController>
                <Button {...addHeadingBlockButton}>タイトルを追加</Button>
                <Button {...addTextBlockButton}>文章を追加</Button>
                <Button {...addImageBlockButton}>画像を追加</Button>
                <Button {...addTableBlockButton}>テーブルを追加</Button>
              </BlockEditorController>
            </Spacer>
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
