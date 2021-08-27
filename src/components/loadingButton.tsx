import React, { useState } from "react"
import { Button, ButtonProps } from "react-bulma-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck } from "@fortawesome/free-solid-svg-icons"

type ButtonStatus = "default" | "loading" | "loaded"

const Loading: React.FC<
  ButtonProps & {
    label?: string
    asyncfunc: <T>() => Promise<T>
  }
> = ({ label, asyncfunc, disabled, color, size }) => {
  const [status, setStatus] = useState<ButtonStatus>("default")

  const lazySetLoaded = () => {
    setTimeout(() => {
      setStatus("loaded")
    }, 600)
  }

  return (
    <Button
      style={{ width: "80px" }}
      loading={status === "loading"}
      disabled={disabled}
      color={color}
      size={size}
      onClick={() => {
        setStatus("loading")
        asyncfunc().then((result) => {
          if (result === "ok") {
            lazySetLoaded()
          } else if (result === undefined) {
            window.alert(
              `対応していないページです\n(正しいページの場合は、ページを再読込みしてください。)`
            )
            setStatus("default")
          } else {
            window.alert(`入力に失敗しました\n${result}`)
            setStatus("default")
          }
        })
      }}
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
