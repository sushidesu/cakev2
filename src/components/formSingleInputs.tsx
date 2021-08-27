import React from "react"
import { Form, InputProps } from "react-bulma-components"
import { SingleItemFields } from "../shopItem"

export type Props = {
  label?: string
  field: keyof SingleItemFields
  value: string
  message: string
  onChange: JSX.IntrinsicElements["input"]["onChange"]
} & InputProps

export const FormInput = ({
  label,
  field,
  value,
  message,
  onChange,
  type,
}: Props): JSX.Element => (
  <Form.Field>
    <Form.Label>{label}</Form.Label>
    <Form.Control>
      <Form.Input
        name={field}
        value={value}
        onChange={onChange}
        color={message ? "danger" : undefined}
        type={type}
        min={type === "number" ? 0 : undefined}
      />
    </Form.Control>
    <Form.Help color={"danger"}>{message}</Form.Help>
  </Form.Field>
)
