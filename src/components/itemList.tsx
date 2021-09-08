import React from "react"
import styled from "styled-components"
import { Button } from "./atom/Button"
import clsx from "clsx"

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
      <aside className="menu">
        <p className="menu-label">Item List</p>
        <ul className="menu-list">
          {items.map((item) => (
            <li key={item.id} onClick={item.onClick}>
              <a className={clsx(item.selected && "is-active")}>{item.name}</a>
            </li>
          ))}
        </ul>
      </aside>
    </Wrapper>
  )
}

export default ItemList
