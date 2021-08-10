import React from "react"

export type Props = JSX.IntrinsicElements["input"]

export function Input(props: Props): JSX.Element {
  return <input className="input" {...props} />
}
