import React from "react"
import ReactDOM from "react-dom"
import "bulma/css/bulma.css"
import { OptionsContainer } from "./components/options/OptionsContainer"
import { AlertContextProvider } from "./contexts/alert/alertContext"
import { getErrorMessage } from "./utils/getErrorMessage"

const Options = (): JSX.Element => {
  return (
    <AlertContextProvider>
      <OptionsContainer />
    </AlertContextProvider>
  )
}

try {
  ReactDOM.render(<Options />, document.getElementById("root"))
} catch (err) {
  console.log(err)
  const message = getErrorMessage(err)
  ReactDOM.render(
    <div>
      <p>{`エラーが発生しました ↓詳細↓`}</p>
      <p>{JSON.stringify(message, undefined, 2)}</p>
    </div>,
    document.getElementById("root")
  )
}
