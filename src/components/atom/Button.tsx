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

type Size = "small" | "normal" | "medium" | "large"

export type Props = {
  visible?: boolean | undefined
  color?: Color | undefined
  size?: Size | undefined
  outlined?: boolean | undefined
  loading?: boolean | undefined
  fullWidth?: boolean | undefined
  // primitive props
  children?: React.ReactNode
  disabled?: JSX.IntrinsicElements["button"]["disabled"]
  onClick?: JSX.IntrinsicElements["button"]["onClick"]
}

const _Button: ForwardRefRenderFunction<HTMLButtonElement, Props> = (
  {
    visible = true,
    color,
    size = "normal",
    outlined = false,
    loading = false,
    fullWidth = false,
    children,
    ...rest
  },
  ref
): JSX.Element | null => {
  return visible ? (
    <button
      ref={ref}
      className={clsx(
        "button",
        `is-${color}`,
        `is-${size}`,
        outlined && "is-outlined",
        loading && "is-loading",
        fullWidth && "is-fullwidth"
      )}
      {...rest}
    >
      {children}
    </button>
  ) : null
}

export const Button = React.forwardRef(_Button)
