import React from "react"
import { IShopItem } from "../shopItem"
import { Action, SingleItemFields } from "./itemStore"
import { Form } from "react-bulma-components"

type FormElement = React.FC<{
  label?: string,
  field: keyof SingleItemFields,
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

export const FormDescriptions: React.FC<{
  value: IShopItem["descriptions"],
  dispatch: React.Dispatch<Action>
}> = ({ value, dispatch }) => {
  return (
    <div>
      {value.map((desc, index) => (
        <Form.Field key={index}>
          <Form.Label>タイトル</Form.Label>
          <Form.Input
            value={desc.title}
            onChange={e => {
              dispatch({
                type: "setMultipleField",
                field: "descriptions",
                index: index,
                textType: "title",
                value: e.target.value
              })
            }}
          />
          <Form.Label>本文</Form.Label>
          <Form.Textarea
            value={desc.body}
            onChange={e =>
              dispatch({
                type: "setMultipleField",
                field: "descriptions",
                index: index,
                textType: "body",
                value: e.target.value
              })
            }
          />
        </Form.Field>
      ))}
    </div>
  )
}

export const FormDetails: React.FC<{
  value: IShopItem['details'],
  dispatch: React.Dispatch<Action>
}> = ({ value, dispatch }) => (
  <>
    {value.map((detail, index) => (
      <Form.Field key={index}>
        {index === 0 && <Form.Label>タイトル</Form.Label>}
        <Form.Input value={detail.title} onChange={e =>
          dispatch({
            type: 'setMultipleField',
            field: 'details',
            index: index,
            textType: 'title',
            value: e.target.value,
          })
        } />
        {index === 0 && <Form.Label>内容</Form.Label>}
        <Form.Input value={detail.body} onChange={e =>
          dispatch({
            type: 'setMultipleField',
            field: 'details',
            index: index,
            textType: 'body',
            value: e.target.value,
          })
        } />
      </Form.Field>
    ))}
  </>
)
