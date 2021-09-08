import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck } from "@fortawesome/free-solid-svg-icons"
import { Button, Props as ButtonProps } from "../atom/Button"

type LoadingStatus = "default" | "loading" | "loaded"

export type Props = Omit<ButtonProps, "loading" | "fullWidth"> & {
  loadingStatus?: LoadingStatus | undefined
}

export function LoadingButton({
  loadingStatus = "default",
  children,
  ...rest
}: Props): JSX.Element | null {
  return (
    <div style={{ width: "80px" }}>
      <Button fullWidth loading={loadingStatus === "loading"} {...rest}>
        {loadingStatus === "loaded" ? (
          <>
            <span className="icon">
              <FontAwesomeIcon icon={faCheck} />
            </span>
            <span>完了</span>
          </>
        ) : (
          children
        )}
      </Button>
    </div>
  )
}
