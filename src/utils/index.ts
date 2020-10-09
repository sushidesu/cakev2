const Format = require("date-format")
import { IShopItem, ItemText } from "../shopItem"
import { ChromeStorageItem } from "../plugins/chromeAPI"
import { GlobalDispatch, GlobalState } from "../components/itemStore"

export const exportFile = async (data: GlobalState) => {
  const storage: ChromeStorageItem = {
    cakev2: data,
  }
  const url =
    "data:text/json;charset=utf-8," +
    encodeURIComponent(JSON.stringify(storage))
  const date = Format("yyyy_MMdd_hhmmss", new Date()) as string
  const name = `itemList_${date}.json`

  chrome.downloads.download({
    url: url,
    filename: name,
  })
}

export const importFile = async (
  file: File,
  overwrite: boolean,
  dispatch: GlobalDispatch
) => {
  const str = await read(file)
  const json = JSON.parse(str)
  const message = overwrite ? "上書きしました。" : "追加しました。"

  // CONFIRM OVERWRITE
  if (
    overwrite &&
    !window.confirm(
      "現在登録されている商品は全て消去されます。よろしいですか？"
    )
  ) {
    return
  }

  if (json.hasOwnProperty("items") || json.hasOwnProperty("idlist")) {
    // cake v1
    const itemlist = convert(json.items, json.idlist)
    dispatch({ type: "import", overwrite: overwrite, value: itemlist })
    window.alert(message)
  } else if (json.hasOwnProperty("cakev2")) {
    // cake v2
    const storage = json as ChromeStorageItem
    dispatch({
      type: "import",
      overwrite: overwrite,
      value: storage.cakev2.shopItems,
    })
    window.alert(message)
  } else {
    window.alert("インポートに失敗しました。対応していないファイルです。")
    return
  }
}

const read = (file: File) => {
  const reader = new FileReader()
  reader.readAsText(file)

  return new Promise<string>(resolve => {
    reader.onload = (ev: ProgressEvent<FileReader>) => {
      typeof ev.target.result === "string"
        ? resolve(ev.target.result)
        : resolve(undefined)
    }
  })
}

interface IOldItem {
  id: string
  name: string
  price: string
  weight: string
  makeshop_stock: string
  rakuten_stock: string
  jancode: string
  descriptions: { title: string; body: string }[]
  details: { title: string; body: string }[]
}

interface IOldItems {
  [id: string]: IOldItem
}

const convert = (items: {}, idlist: {}): IShopItem[] =>
  Object.values(idlist as string[]).map<IShopItem>((id, index) => {
    const item = (items as IOldItems)[id] as IOldItem
    return {
      id: index,
      name: item.name,
      price: item.price,
      imageURL: "",
      weight: item.weight,
      stockRakuten: item.rakuten_stock,
      stockMakeshop: item.makeshop_stock,
      jancode: item.jancode,
      descriptions: item.descriptions.map<ItemText>((v, i) => ({
        title: v.title,
        body: v.body,
        index: i,
      })),
      details: item.details.map<ItemText>((v, i) => ({
        title: v.title,
        body: v.body,
        index: i,
      })),
    }
  })
