import React from "react"
import clsx from "clsx"

type Color =
  | "white"
  | "light"
  | "dark"
  | "black"
  | "text"
  | "ghost"
  | "primary"
  | "link"
  | "info"
  | "success"
  | "warning"
  | "danger"

export type Props = {
  visible?: boolean | undefined
  color?: Color | undefined
  outlined?: boolean | undefined
  // primitive props
  children?: React.ReactNode
  onClick?: JSX.IntrinsicElements["button"]["onClick"]
}

export function Button({
  visible = true,
  color,
  outlined = false,
  ...rest
}: Props): JSX.Element | null {
  return visible ? (
    <button
      className={clsx("button", `is-${color}`, outlined && "is-outlined")}
      {...rest}
    />
  ) : null
}
