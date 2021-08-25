import React from "react"
import ReactDOM from "react-dom"
import "react-bulma-components/dist/react-bulma-components.min.css"
import { ItemStoreProvider } from "./components/itemStore"
import { OptionsContainer } from "./components/options/OptionsContainer"
import { AlertContextProvider } from "./contexts/alert/alertContext"

const Options = (): JSX.Element => {
  return (
    <AlertContextProvider>
      <OptionsContainer />
    </AlertContextProvider>
  )
}

try {
  ReactDOM.render(
    <ItemStoreProvider>
      <Options />
    </ItemStoreProvider>,
    document.getElementById("root")
  )
} catch (err) {
  console.log(err)
  ReactDOM.render(
    <div>
      <p>{`エラーが発生しました ↓詳細↓`}</p>
      <p>{JSON.stringify(err.message, undefined, 2)}</p>
    </div>,
    document.getElementById("root")
  )
}
