import { IShopItem } from "../shopItem"

type GlobalState = {
  shopItems: IShopItem[]
  nowItemIndex: number | null
}

export type ChromeStorageItem = {
  cakev2: GlobalState
}

export const getAll = (): Promise<{ [key: string]: any }> =>
  new Promise((resolve) => {
    chrome.storage.local.get(null, (items) => {
      resolve(items)
    })
  })

export const clearAll = () => {
  chrome.storage.local.clear()
}

export const getChromeStorage = () =>
  new Promise<ChromeStorageItem>((resolve) => {
    chrome.storage.local.get("cakev2", (items) => {
      const result = items["cakev2"]
      if (result === undefined) {
        resolve({
          cakev2: {
            nowItemIndex: null,
            shopItems: [],
          },
        })
      } else {
        resolve({ cakev2: result })
      }
    })
  })

export const setChromeStorage = (state: GlobalState) => {
  const items: ChromeStorageItem = {
    cakev2: {
      nowItemIndex: state.nowItemIndex,
      shopItems: state.shopItems,
    },
  }
  chrome.storage.local.set(items)
}
