import React from "react"

export type Props = JSX.IntrinsicElements["button"]

export function CloseButton(props: Props): JSX.Element {
  return <button className="delete" aria-label="close" {...props} />
}
