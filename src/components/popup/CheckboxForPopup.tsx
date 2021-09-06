import React from "react"
import { Form } from "react-bulma-components"

export type Props = {
  name: keyof CheckboxState
  value: boolean
  onCheck: (name: keyof CheckboxState) => void
  disabled: boolean
  children?: React.ReactNode
}

export type CheckboxState = {
  all: boolean
  info: boolean
  stock: boolean
  descriptions: boolean
}

export function CheckboxForPopup({
  name,
  value,
  onCheck,
  disabled,
  children,
}: Props): JSX.Element {
  return (
    <Form.Checkbox
      checked={value}
      onChange={() => {
        onCheck(name)
      }}
      disabled={disabled}
    >
      {children}
    </Form.Checkbox>
  )
}
