import React from "react"
import styled from "styled-components"
import { IShopItem } from "../shopItem"
import { Action, SingleItemFields, MultipleItemFields } from "./itemStore"
import { Form, Button, Icon } from "react-bulma-components"

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

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  button {
    margin-left: 10px;
    font-size: large;
    font-weight: bold;
  }
`

const AddOrRemove: React.FC<{
  dispatch: React.Dispatch<Action>
  field: keyof MultipleItemFields
}> = ({ dispatch, field }) => (
  <ButtonWrapper>
    <Button color={"light"} onClick={() =>
      dispatch({
        type: "addMultipleFields",
        field: field
      })
    }>
      <Icon><span>+</span></Icon> 
    </Button>
    <Button color={"light"} onClick={() =>
      dispatch({
        type: "removeMultipleFields",
        field: field
      })
    }>
      <Icon><span>-</span></Icon>
    </Button>
  </ButtonWrapper>
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
      <AddOrRemove field={"descriptions"} dispatch={dispatch} />
    </div>
  )
}

const Details = styled.div`
  .details-item {
    display: flex;
    width: 100%;
  }

  .details-item-title,
  .details-item-body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .details-item-title {
    width: 30%;
    margin-right: 10px;
  }
  .details-item-body {
    width: 70%;
  }
`

export const FormDetails: React.FC<{
  value: IShopItem['details'],
  dispatch: React.Dispatch<Action>
}> = ({ value, dispatch }) => (
  <Details>
    {value.map((detail, index) => (
      <Form.Field className="details-item" key={index}>
        <div className="details-item-title">
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
        </div>
        <div className="details-item-body">
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
        </div>
      </Form.Field>
    ))}
    <AddOrRemove field={"details"} dispatch={dispatch} />
  </Details>
)
