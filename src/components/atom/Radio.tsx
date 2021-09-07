import React, { ForwardRefRenderFunction } from "react"
import clsx from "clsx"

export type Props = Omit<JSX.IntrinsicElements["input"], "ref" | "type">

const _Radio: ForwardRefRenderFunction<HTMLInputElement, Props> = (
  { children, ...rest },
  ref
) => {
  return (
    <label className={clsx("radio")}>
      <input ref={ref} type={"radio"} {...rest} />
      <span>{children}</span>
    </label>
  )
}

export const Radio = React.forwardRef(_Radio)
