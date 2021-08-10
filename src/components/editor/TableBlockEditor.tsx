import React from "react"
import styled from "styled-components"
import { TableBlock, TableRow } from "../../domain/customBlock/block"
import { BlockEditorProps } from "./BlockEditor"
import { BlockEditorWrapper } from "./BlockEditorWrapper"
import { TableRowEditor } from "./TableRowEditor"
import { Button } from "../Button"

export function TableBlockEditor({
  block,
  update,
  ...rest
}: BlockEditorProps<TableBlock>): JSX.Element {
  const addRow = () => {
    update({
      id: block.id,
      mutation: prev => {
        if (prev.type === "table") {
          return {
            ...prev,
            type: "table",
            value: {
              ...prev.value,
              rows: prev.value.rows.concat({ title: "", body: "" }),
            },
          }
        } else {
          return prev
        }
      },
    })
  }
  const removeRow = () => {
    update({
      id: block.id,
      mutation: prev => {
        if (prev.type === "table") {
          return {
            ...prev,
            type: "table",
            value: {
              ...prev.value,
              rows: prev.value.rows.slice(0, prev.value.rows.length - 1),
            },
          }
        } else {
          return prev
        }
      },
    })
  }
  const rowUpdater: (
    index: number
  ) => (
    mutation: (prev: TableRow) => TableRow
  ) => void = index => rowMutation => {
    update({
      id: block.id,
      mutation: prev => {
        if (prev.type === "table") {
          const newRows = [...prev.value.rows]
          newRows[index] = rowMutation(newRows[index])
          return {
            ...prev,
            type: "table",
            value: {
              ...prev.value,
              rows: newRows,
            },
          }
        } else {
          return prev
        }
      },
    })
  }
  return (
    <BlockEditorWrapper label="テーブル" {...rest}>
      <table className="table is-fullwidth">
        <tbody>
          {block.value.rows.map((row, i) => (
            <TableRowEditor key={i} row={row} update={rowUpdater(i)} />
          ))}
        </tbody>
      </table>
      <Controller>
        <Button color="light" onClick={addRow}>
          行を追加
        </Button>
        <Button color="light" onClick={removeRow}>
          行を削除
        </Button>
      </Controller>
    </BlockEditorWrapper>
  )
}

const Controller = styled.div`
  margin-top: 1em;
  & > .button + .button {
    margin-left: 0.5em;
  }
`
