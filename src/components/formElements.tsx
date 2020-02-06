import React from "react"
import { IShopItem } from "../shopItem"
import { Action } from "./itemStore"
import { Form } from "react-bulma-components"

type FormElement = React.FC<{
  label: string,
  field: keyof IShopItem,
  value: string,
  dispatch: React.Dispatch<Action>
}>

export const FormInput: FormElement =
  ({ label, field, value, dispatch }) => (
    <Form.Field>
      <Form.Label>{label}</Form.Label>
      <Form.Input
        name={field}
        value={value}
        onChange={e =>
          dispatch({
            type: "setField",
            field: field,
            value: e.target.value
          })
        }
      />
    </Form.Field>
  )
