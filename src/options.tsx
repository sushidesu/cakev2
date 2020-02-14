import React from "react"
import ReactDOM from "react-dom"
import styled from "styled-components"
import { Container, Columns } from "react-bulma-components"
import "react-bulma-components/dist/react-bulma-components.min.css"

import { ItemStoreProvider } from "./components/itemStore"
import Header from "./components/header"
import ItemList from "./components/itemList"
import ItemEditor from "./components/itemEditor"

const Wrapper = styled.div`
  margin: 10px;
  .sidemenu {
    min-width: 230px;
  }
`

const Options = () => (
  <Wrapper>
    <Header />
    <Container>
      <Columns className={"is-mobile"}>
        <Columns.Column size={3} className={"sidemenu"}>
          <ItemList />
        </Columns.Column>
        <Columns.Column>
          <ItemEditor />
        </Columns.Column>
      </Columns>
    </Container>
  </Wrapper>
)

ReactDOM.render(
  <ItemStoreProvider>
    <Options />
  </ItemStoreProvider>,
  document.getElementById("root")
)
