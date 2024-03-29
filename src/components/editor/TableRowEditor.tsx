import React from "react"
import styled from "styled-components"
import { TableRow } from "../../domain/customBlock/block"
import { Input } from "../atom/Input"
import { Textarea } from "../atom/Textarea"

type TableRowEditorProps = {
  row: TableRow
  update: (mutation: (prev: TableRow) => TableRow) => void
}

export function TableRowEditor({
  row,
  update,
}: TableRowEditorProps): JSX.Element {
  return (
    <tr>
      <NarrowTh>
        <Input
          placeholder="例: 内容量"
          defaultValue={row.title}
          onBlur={e => {
            e.persist()
            update(prev => ({
              ...prev,
              title: e.target.value,
            }))
          }}
        />
      </NarrowTh>
      <td>
        <Textarea
          placeholder="例: 100g"
          rows={3}
          defaultValue={row.body}
          onBlur={e => {
            e.persist()
            update(prev => ({
              ...prev,
              body: e.target.value,
            }))
          }}
        />
      </td>
    </tr>
  )
}

const NarrowTh = styled.th`
  width: 40%;
`
