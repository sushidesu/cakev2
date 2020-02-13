import React from "react"
import styled from "styled-components"
import { IShopItem } from "../shopItem"
import { Action, SingleItemFields, MultipleItemFields } from "./itemStore"
import { Form, Button, Icon, Box, Media, Image, InputProps } from "react-bulma-components"

type FormElement = React.FC<{
  label?: string,
  field: keyof SingleItemFields,
  value: string,
  dispatch: React.Dispatch<Action>
} & InputProps>

export const FormInput: FormElement =
  ({ label, field, value, dispatch, type }) => (
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
        type={type}
        min={type === "number" ? 0 : null}
      />
    </Form.Field>
  )

const Figure = styled.figure`
  img {
    position: relative;
    object-fit: contain;
    width: 128px;
    height: 128px;
    background-color: #fff;
  }
`

const Thumbnail: React.FC<{ src: string }> = ({ src }) => (
  <Figure className={"image is-128x128"}>
    {src && <img src={src} /> }
  </Figure>
)

export const FormImageInput: FormElement =
  ({ label, field, value, dispatch }) => (
    <Media>
      <div className="media-left" style={{ backgroundColor: "#efefef"}}>
        <Thumbnail src={value} />
      </div>
      <Media.Item>
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
      </Media.Item>
    </Media>
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

const NoItem = () => (
  <Box style={{ userSelect: "none"}}>
    <span>なし</span>
  </Box>
)

export const FormDescriptions: React.FC<{
  value: IShopItem["descriptions"],
  dispatch: React.Dispatch<Action>
}> = ({ value, dispatch }) => {
  return (
    <div>
      {value.length === 0 && <NoItem />}
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
    {value.length === 0 && <NoItem />}
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
