import React from "react"
import styled from "styled-components"
import { Form, Media, InputProps } from "react-bulma-components"
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

export const FormImageInput = ({
  label,
  field,
  value,
  onChange,
}: Props): JSX.Element => (
  <Media>
    <div className="media-left" style={{ backgroundColor: "#efefef" }}>
      <Thumbnail src={value} />
    </div>
    <Media.Item>
      <Form.Field>
        <Form.Label>{label}</Form.Label>
        <Form.Input name={field} value={value} onChange={onChange} />
      </Form.Field>
    </Media.Item>
  </Media>
)
