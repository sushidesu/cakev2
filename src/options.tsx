import React from "react"
import ReactDOM from "react-dom"
import styled from "styled-components"
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
    <ItemList />
    <ItemEditor />
  </Wrapper>
)

ReactDOM.render((
  <ItemStoreProvider>
    <Options />
  </ItemStoreProvider>),
  document.getElementById('root')
)
