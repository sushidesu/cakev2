import React from "react"

export type AlertMessageProps = {
  type: "info"
  message: string
  onClickRemove?: () => void
}

export function AlertMessage({
  message,
  onClickRemove,
}: AlertMessageProps): JSX.Element {
  return (
    <div>
      <button onClick={onClickRemove}>X</button>
      <p>{message}</p>
    </div>
  )
}
