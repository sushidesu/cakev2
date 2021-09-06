import React from "react"
import clsx from "clsx"
import { SingleItemFields } from "../../shopItem"
import { Input } from "../atom/Input"

export type Props = {
  label: string
  field: keyof SingleItemFields
  message: string
  value?: string
  onChange?: JSX.IntrinsicElements["input"]["onChange"]
  type?: string
}

export function InputFieldForItemInfo({
  label,
  field,
  value,
  onChange,
  message,
  type,
}: Props): JSX.Element {
  return (
    <div className={clsx("field")}>
      <label className={clsx("label")}>{label}</label>
      <div className={clsx("control")}>
        <Input
          name={field}
          value={value}
          onChange={onChange}
          color={message ? "danger" : undefined}
          type={type}
          min={type === "number" ? 0 : undefined}
        />
      </div>
      <p className={clsx("help", "is-danger")}>{message}</p>
    </div>
  )
}
