import React from "react"
import { Button as BulmaButton, ButtonProps } from "react-bulma-components"

export type Props = {
  visible?: boolean
} & ButtonProps

export function Button({ visible = true, ...rest }: Props): JSX.Element | null {
  return visible ? <BulmaButton {...rest} /> : null
}
