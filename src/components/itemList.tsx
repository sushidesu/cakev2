import React from "react"
import styled from "styled-components"
import { Menu } from "react-bulma-components"
import { Button } from "./atom/Button"

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

export type Props = {
  onClickCreateButton?: () => void
  createButtonDisabled?: boolean
  items: {
    id: string
    name: string
    selected?: boolean
    onClick?: () => void
  }[]
}

function ItemList({
  onClickCreateButton,
  createButtonDisabled,
  items,
}: Props): JSX.Element {
  return (
    <Wrapper>
      <ButtonWrapper>
        <Button onClick={onClickCreateButton} disabled={createButtonDisabled}>
          新しい商品を追加
        </Button>
      </ButtonWrapper>
      <Menu>
        <Menu.List title="Item List">
          {items.map((item) => (
            <Menu.List.Item
              key={item.id}
              active={item.selected}
              onClick={item.onClick}
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
