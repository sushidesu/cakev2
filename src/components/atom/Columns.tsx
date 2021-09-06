import clsx from "clsx"
import React from "react"

export type Props = {
  mobile?: boolean | undefined
  multiline?: boolean | undefined
  children?: React.ReactNode
}

export function Columns({ mobile, multiline, children }: Props): JSX.Element {
  return (
    <div
      className={clsx(
        "columns",
        mobile && "is-mobile",
        multiline && "is-multiline"
      )}
    >
      {children}
    </div>
  )
}
