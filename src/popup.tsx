import React from "react"
import ReactDOM from "react-dom"
import "react-bulma-components/dist/react-bulma-components.min.css"
import { PopupContainer } from "./components/popup/PopupContainer"
import { useFetch } from "./shared/useFetch"
import { getChromeStorage } from "./plugins/chromeAPI"
import { initialItem } from "./shopItem"

function PopupPage(): JSX.Element {
  const itemLoading = useFetch(async () => {
    const { cakev2 } = await getChromeStorage()
    const { nowItemIndex, shopItems } = cakev2
    if (nowItemIndex === null) {
      return initialItem
    } else {
      return shopItems[nowItemIndex]
    }
  })

  return <PopupContainer itemLoading={itemLoading} />
}

ReactDOM.render(<PopupPage />, document.getElementById("root"))
