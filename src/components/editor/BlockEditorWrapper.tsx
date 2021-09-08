import React from "react"
import styled from "styled-components"
import { Button } from "../atom/Button"
import { CloseButton } from "../CloseButton"
import { Icon } from "../atom/Icon"

export type Props = {
  label: string
  remove: () => void
  moveUp: () => void
  moveDown: () => void
  children?: React.ReactNode
}

export function BlockEditorWrapper({
  label,
  remove,
  moveUp,
  moveDown,
  children,
}: Props): JSX.Element {
  return (
    <Wrapper className={"field box"}>
      <Editor>
        <label className={"label"}>{label}</label>
        <div className={"control"}>{children}</div>
      </Editor>
      <Controller>
        <div className="delete-button">
          <CloseButton onClick={remove} />
        </div>
        <div className="move-buttons">
          <Button onClick={moveUp}>
            <Icon>↑</Icon>
          </Button>
          <Button onClick={moveDown}>
            <Icon>↓</Icon>
          </Button>
        </div>
      </Controller>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  display: flex;
`

const Editor = styled.div`
  flex: 1 1 auto;
`

const Controller = styled.div`
  margin-left: 1.5em;
  display: flex;
  flex-direction: column;
  justify-content: top;
  align-items: right;

  & > .delete-button {
    width: fit-content;
    margin: 0 auto;
  }
  & > .move-buttons {
    margin-top: 1em;
    display: flex;
    flex-direction: column;
    & > .button + .button {
      margin-top: 0.5em;
    }
  }
`
