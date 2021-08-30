import React from "react"
import ReactDOM from "react-dom"
import "react-bulma-components/dist/react-bulma-components.min.css"
import { PopupContainer } from "./components/popup/PopupContainer"

function PopupPage(): JSX.Element {
  return <PopupContainer />
}

ReactDOM.render(<PopupPage />, document.getElementById("root"))
