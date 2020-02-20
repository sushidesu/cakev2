import React from "react"
import { IShopItem, ItemText } from "../shopItem"
import { ChromeStorageItem } from "../plugins/chromeAPI"
import { Action } from "../components/itemStore"

export const importFile = async (
  file: File,
  overwrite: boolean,
  dispatch: React.Dispatch<Action>
) => {
  const str = await read(file)
  const json = JSON.parse(str)
  const message = overwrite ? "上書きしました。" : "追加しました。"

  if (json.hasOwnProperty("items")) {
    // cake v1
    const itemlist = convert(json.items)
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

interface OldItems {
  [id: string]: IOldItem
}

const convert = (items: {}): IShopItem[] =>
  Object.values(items as OldItems).map<IShopItem>((item, index) => ({
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
  }))
