import React from "react"

export type Props = {
  children?: React.ReactNode
}

export function Icon({ children }: Props): JSX.Element {
  return <span className={"icon"}>{children}</span>
}
