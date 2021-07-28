import React from "react"
import ReactDOM from "react-dom"
import styled from "styled-components"
import { Container, Columns } from "react-bulma-components"
import "react-bulma-components/dist/react-bulma-components.min.css"

import { ItemStoreProvider } from "./components/itemStore"
import Header from "./components/header"
import ItemList from "./components/itemList"
import ItemEditor from "./components/itemEditor"

import { useItemCollection } from "./domain/item/useItem"

const Wrapper = styled.div`
  margin: 0 10px;
  & > .container {
    margin-top: 20px;
  }
  .sidemenu {
    min-width: 230px;
  }
`

const Options = (): JSX.Element => {
  const { selectedItemId, itemList, select, create } = useItemCollection()
  const target = itemList.find(
    item => selectedItemId && item.id.equals(selectedItemId)
  )
  console.log(itemList)
  return (
    <Wrapper>
      <Header />
      <Container>
        <Columns className={"is-mobile"}>
          <Columns.Column size={3} className={"sidemenu"}>
            <ItemList
              onClickCreateButton={create}
              createButtonDisabled={selectedItemId === null}
              items={itemList.map(item => ({
                id: item.id.value,
                name: item.name,
                selected: selectedItemId && item.id.equals(selectedItemId),
                onClick: () => {
                  select(item.id)
                },
              }))}
            />
          </Columns.Column>
          <Columns.Column>
            <ItemEditor
              editTargetItem={
                target
                  ? {
                      id: target.id.value,
                      name: target.name,
                      price: target.price,
                      weight: target.weight,
                      stockRakuten: target.stockRakuten,
                      stockMakeshop: target.stockMakeshop,
                      jancode: target.jancode.toString(),
                    }
                  : undefined
              }
            />
          </Columns.Column>
        </Columns>
      </Container>
    </Wrapper>
  )
}

try {
  ReactDOM.render(
    <ItemStoreProvider>
      <Options />
    </ItemStoreProvider>,
    document.getElementById("root")
  )
} catch (err) {
  console.log(err)
  ReactDOM.render(
    <div>
      <p>{`エラーが発生しました ↓詳細↓`}</p>
      <p>{JSON.stringify(err.message, undefined, 2)}</p>
    </div>,
    document.getElementById("root")
  )
}
