import React from "react"
import ReactDOM from "react-dom"
import "bulma/css/bulma.css"
import { PopupContainer } from "./components/popup/PopupContainer"
import { useFetch } from "./shared/useFetch"
import { ChromeStorageClient } from "./infra/chrome-storage-client/chrome-storage-client"
import { ItemCollectionRepository } from "./infra/item-collection-repository/item-collection-repository"
import { GetCurrentItemUsecase } from "./usecase/get-current-item-usecase"

function PopupPage(): JSX.Element {
  const chromeStorageClient = new ChromeStorageClient()
  const itemCollectionRepo = new ItemCollectionRepository(chromeStorageClient)
  const getCurrentItem = new GetCurrentItemUsecase(itemCollectionRepo)

  const itemLoading = useFetch(() => {
    return getCurrentItem.exec()
  })

  return <PopupContainer itemLoading={itemLoading} />
}

ReactDOM.render(<PopupPage />, document.getElementById("root"))
