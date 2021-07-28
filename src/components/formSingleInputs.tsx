import React from "react"
import styled from "styled-components"
import { Form, Media, InputProps } from "react-bulma-components"
import { SingleItemFields } from "../shopItem"
import { FormDispatch } from "./formState"

type FormElement = React.FC<
  {
    label?: string
    field: keyof SingleItemFields
    value: string
    message: string
    onChange?: JSX.IntrinsicElements["input"]["onChange"]
    dispatch: FormDispatch
  } & InputProps
>

export const FormInput: FormElement = ({
  label,
  field,
  value,
  message,
  onChange,
  type,
}) => (
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
  <Figure className={"image is-128x128"}>{src && <img src={src} />}</Figure>
)

export const FormImageInput: FormElement = ({
  label,
  field,
  value,
  dispatch,
}) => (
  <Media>
    <div className="media-left" style={{ backgroundColor: "#efefef" }}>
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
              value: e.target.value,
            })
          }
        />
      </Form.Field>
    </Media.Item>
  </Media>
)
