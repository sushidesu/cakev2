import React, { ForwardRefRenderFunction } from "react"

export type Props = {
  name?: string | undefined
  onClick?: JSX.IntrinsicElements["input"]["onClick"]
  checked?: boolean | undefined
  disabled?: boolean | undefined
  children?: React.ReactNode
}

const _CheckBox: ForwardRefRenderFunction<HTMLInputElement, Props> = (
  { children, name, checked, disabled = false, onClick },
  ref
) => {
  return (
    <label className="checkbox">
      <input
        ref={ref}
        name={name}
        type="checkbox"
        onClick={onClick}
        checked={checked}
        disabled={disabled}
      />
      <span style={{ marginLeft: "0.5em" }}>{children}</span>
    </label>
  )
}
// FIXME: use Bulma helpers instead of style prop

export const Checkbox = React.forwardRef(_CheckBox)
