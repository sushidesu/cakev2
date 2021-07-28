import React, { useContext } from "react"
import styled from "styled-components"
import { Menu, Button } from "react-bulma-components"
import { ItemStore } from "./itemStore"
import { IShopItem } from "../shopItem"

const Wrapper = styled.div`
  position: sticky;
  top: 20px;

  .menu-list {
    overflow-y: auto;
    max-height: 80vh;
  }
`

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
  margin-bottom: 1rem;
`

function ItemList(): JSX.Element {
  const { globalState, setGlobalState } = useContext(ItemStore)

  return (
    <Wrapper>
      <ButtonWrapper>
        <Button
          onClick={() => {
            setGlobalState({ type: "select", index: null })
          }}
          disabled={globalState.nowItemIndex === null}
        >
          新しい商品を追加
        </Button>
      </ButtonWrapper>
      <Menu>
        <Menu.List title="Item List">
          {globalState.shopItems.map((item: IShopItem) => (
            <Menu.List.Item
              key={item.id}
              active={item.id === globalState.nowItemIndex}
              onClick={() =>
                setGlobalState({
                  type: "select",
                  index: item.id,
                })
              }
            >
              {item.name}
            </Menu.List.Item>
          ))}
        </Menu.List>
      </Menu>
    </Wrapper>
  )
}

export default ItemList
