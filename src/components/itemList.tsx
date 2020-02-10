import React, { useContext } from "react"
import styled from "styled-components"
import { Menu, Button } from "react-bulma-components"
import { ItemStore } from "./itemStore"
import { IShopItem } from "../shopItem"

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
  margin-bottom: 1rem;
`

export default () => {
  const { globalState, setGlobalState } = useContext(ItemStore)

  return (
    <Menu>
      <Menu.List title="Item List">
        {globalState.shopItems.map((item: IShopItem) => (
          <Menu.List.Item
            key={item.id}
            active={item.id === globalState.nowItemIndex}
            onClick={() => setGlobalState({
              type: "select",
              index: item.id
            })
          }>{ item.name }</Menu.List.Item>
        ))}
        <ButtonWrapper>
          <Button
            onClick={() => {
              setGlobalState({ type: "initField" })
            }}
            color={"primary"}
            outlined={true}
            disabled={globalState.nowItemIndex === null}
          >新しい商品を追加</Button>
        </ButtonWrapper>
      </Menu.List>
    </Menu>
  )
}
