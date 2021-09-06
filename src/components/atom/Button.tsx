import React, { ForwardRefRenderFunction } from "react"
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
  disabled?: JSX.IntrinsicElements["button"]["disabled"]
  onClick?: JSX.IntrinsicElements["button"]["onClick"]
}

const _Button: ForwardRefRenderFunction<HTMLButtonElement, Props> = (
  { visible = true, color, outlined = false, ...rest },
  ref
): JSX.Element | null => {
  return visible ? (
    <button
      ref={ref}
      className={clsx("button", `is-${color}`, outlined && "is-outlined")}
      {...rest}
    />
  ) : null
}

export const Button = React.forwardRef(_Button)
