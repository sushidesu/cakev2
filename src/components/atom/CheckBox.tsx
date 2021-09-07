import React, { ForwardRefRenderFunction } from "react"

export type Props = Omit<JSX.IntrinsicElements["input"], "type">
const _CheckBox: ForwardRefRenderFunction<HTMLInputElement, Props> = (
  { children, ...rest },
  ref
) => {
  return (
    <label className="checkbox">
      <input ref={ref} type={"checkbox"} {...rest} />
      <span style={{ marginLeft: "0.4em" }}>{children}</span>
    </label>
  )
}
// FIXME: use Bulma helpers instead of style prop

export const Checkbox = React.forwardRef(_CheckBox)
