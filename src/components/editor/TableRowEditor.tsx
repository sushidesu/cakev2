import React from "react"
import { TableRow } from "../../domain/customBlock/block"

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
        <input
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
        <input
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
