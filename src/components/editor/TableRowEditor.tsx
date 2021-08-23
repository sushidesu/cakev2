import React from "react"
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
      <th>
        <Input
          defaultValue={row.title}
          onBlur={e => {
            e.persist()
            update(prev => ({
              ...prev,
              title: e.target.value,
            }))
          }}
        />
      </th>
      <td>
        <Textarea
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
