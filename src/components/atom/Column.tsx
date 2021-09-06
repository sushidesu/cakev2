import React from "react"
import clsx from "clsx"

export type Props = {
  half?: boolean | undefined
  children?: React.ReactNode
}

export function Column({ half, children }: Props): JSX.Element {
  return <div className={clsx("column", half && "is-half")}>{children}</div>
}
