import React from "react"
import styled from "styled-components"
import { Container, Columns } from "react-bulma-components"
import Header from "../header"
import ItemList, { Props as ItemListProps } from "../itemList"
import ItemEditor, { Props as ItemEditorProps } from "../itemEditor"

export type Props = {
  itemListProps: ItemListProps
  itemEditorProps: ItemEditorProps
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

export function OptionsTemplate({
  itemListProps,
  itemEditorProps,
}: Props): JSX.Element {
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
          </Columns.Column>
        </Columns>
      </Container>
    </Wrapper>
  )
}
