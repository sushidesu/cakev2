import { CheckboxState } from "./components/popup/CheckboxForPopup"
import { Item } from "./domain/item/item"
import { GetCurrentItemUsecase } from "./usecase/get-current-item-usecase"
import { ItemCollectionRepository } from "./infra/itemCollectionRepository"
import { ChromeStorageClient } from "./infra/chromeStorageClient"
import { ChromeMessenger } from "./infra/chrome-messenger/chrome-messenger"
import {
  AutoFillMessage,
  AutoFillResponse,
} from "./infra/interface/auto-fill-message"
import {
  AutomaticInputUsecase,
  AutomaticInputUsecaseProps,
} from "./usecase/automatic-input-usecase/automatic-input-usecase"
import { AutomaticInputRakutenClient } from "./infra/automatic-input-client/automatic-input-rakuten-client"
import { AutomaticInputMakeshopClient } from "./infra/automatic-input-client/automatic-input-makeshop-client"
import { getErrorMessage } from "./utils/getErrorMessage"

const autoWrite = async (item: Item, checked: CheckboxState) => {
  const props: AutomaticInputUsecaseProps = {
    item,
    info: checked.info,
    stock: checked.stock,
    descriptions: checked.descriptions,
  }
  switch (window.location.host) {
    case "item.rms.rakuten.co.jp": {
      const rakutenClient = new AutomaticInputRakutenClient()
      const automaticInput = new AutomaticInputUsecase(rakutenClient)
      automaticInput.exec(props)
      break
    }
    case "shop16.makeshop.jp": {
      const makeshopClient = new AutomaticInputMakeshopClient()
      const automaticInput = new AutomaticInputUsecase(makeshopClient)
      automaticInput.exec(props)
      break
    }
    default:
      throw new Error("対応していないサイトです")
  }
}

console.log("cakev2 loaded")
const chromeMessenger = new ChromeMessenger<AutoFillMessage, AutoFillResponse>()
const chromeStorageClient = new ChromeStorageClient()
const itemCollectionRepo = new ItemCollectionRepository(chromeStorageClient)
const getCurrentItem = new GetCurrentItemUsecase(itemCollectionRepo)

chromeMessenger.addListener(async (message) => {
  try {
    const result = await getCurrentItem.exec()
    if (result === undefined) {
      return {
        ok: false,
        message: "item not found",
      }
    }

    const { fillInfo, fillStock, fillDescription } = message
    await autoWrite(result, {
      all: fillInfo && fillStock && fillDescription,
      info: fillInfo,
      stock: fillStock,
      descriptions: fillDescription,
    })

    return {
      ok: true,
    }
  } catch (err) {
    console.log(err)
    const message = getErrorMessage(err)
    return {
      ok: false,
      message,
    }
  }
})
