import React from "react"
import clsx from "clsx"
import { CloseButton } from "../CloseButton"

export type Props = {
  title: string
  type?: "dark" | "primary" | "link" | "info" | "success" | "warning" | "danger"
  children?: React.ReactNode
  onDeleteClick?: () => void
}

export function Message({
  type = "dark",
  title,
  children,
  onDeleteClick,
}: Props): JSX.Element {
  return (
    <div className={clsx("message", `is-${type}`)}>
      <div className="message-header">
        <p>{title}</p>
        {onDeleteClick ? <CloseButton onClick={onDeleteClick} /> : null}
      </div>
      <div className="message-body">{children}</div>
    </div>
  )
}
