import { write_to_rakuten } from "./plugins/rakuten"
import { write_to_makeshop } from "./plugins/makeshop"
import { CheckboxState } from "./components/popup/Checkbox"
import { Item } from "./domain/item/item"
import { GetCurrentItemUsecase } from "./usecase/get-current-item-usecase"
import { ItemCollectionRepository } from "./infra/itemCollectionRepository"
import { ChromeStorageClient } from "./infra/chromeStorageClient"
import { ChromeMessenger } from "./infra/chrome-messenger/chrome-messenger"
import {
  AutoFillMessage,
  AutoFillResponse,
} from "./infra/interface/auto-fill-message"
import { IShopItem } from "./shopItem" // TODO

const autoWrite = async (item: Item, checked: CheckboxState) => {
  const selected: IShopItem = {
    // TODO
    id: 0,
    name: item.name,
    price: item.price.toString(),
    weight: item.weight.toString(),
    jancode: item.jancode?.toString() ?? "",
    stockRakuten: item.stockRakuten.toString(),
    stockMakeshop: item.stockMakeshop.toString(),
    details: [],
    descriptions: [],
    imageURL: "",
  }

  switch (window.location.host) {
    case "item.rms.rakuten.co.jp":
      write_to_rakuten(selected, checked)
      break
    case "shop16.makeshop.jp":
      write_to_makeshop(selected, checked)
      break
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
    return {
      ok: false,
      message: err.toString(),
    }
  }
})
