import React from "react"
import { Button, ButtonProps } from "react-bulma-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck } from "@fortawesome/free-solid-svg-icons"

type ButtonStatus = "default" | "loading" | "loaded"

export type Props = ButtonProps & {
  label?: string
  status: ButtonStatus
}

function Loading({
  label,
  status,
  onClick,
  disabled,
  color,
  size,
}: Props): JSX.Element {
  return (
    <Button
      style={{ width: "80px" }}
      loading={status === "loading"}
      disabled={disabled}
      color={color}
      size={size}
      onClick={onClick}
    >
      {status === "loaded" ? (
        <span className="icon">
          <FontAwesomeIcon icon={faCheck} />
        </span>
      ) : (
        <span>{label}</span>
      )}
    </Button>
  )
}

export default Loading
