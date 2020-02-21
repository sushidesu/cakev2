import React, { createContext, useReducer, useEffect } from "react"
import { IShopItem, initialItem } from "../shopItem"
import {
  getChromeStorage,
  setChromeStorage,
  ChromeStorageItem,
} from "../plugins/chromeAPI"

type GlobalState = {
  shopItems: IShopItem[]
  nowItemIndex: number
}

type GlobalAction =
  | {
      type: "update"
      item: IShopItem
    }
  | {
      type: "duplicate"
      index: number
    }
  | {
      type: "delete"
      index: number
    }
  | {
      type: "select"
      index: number
    }
  | {
      type: "sync"
      value: ChromeStorageItem["cakev2"]
    }
  | {
      type: "import"
      overwrite: boolean
      value: IShopItem[]
    }

const reducer = (state: GlobalState, action: GlobalAction): GlobalState => {
  switch (action.type) {
    case "update":
      if (action.item.id === null) {
        // new item
        const newItem: IShopItem = {
          ...action.item,
          id: state.shopItems.length,
        }
        return {
          shopItems: [...state.shopItems, newItem],
          nowItemIndex: newItem.id,
        }
      } else {
        // item already exists
        const newItems = [...state.shopItems]
        newItems[action.item.id] = action.item
        return {
          ...state,
          shopItems: newItems,
        }
      }
    case "duplicate":
      const duplicated = { ...state.shopItems[action.index] }
      const suffix =
        1 +
        state.shopItems.filter(
          shopitem =>
            shopitem.name.slice(0, duplicated.name.length) === duplicated.name
        ).length
      duplicated.name += `_${suffix}`
      duplicated.id = state.shopItems.length
      return {
        ...state,
        shopItems: [...state.shopItems, duplicated],
      }
    case "delete":
      const deletedItemList = state.shopItems
        .filter((_, index) => action.index !== index)
        .map((item, index) => {
          item.id = index
          return item
        })
      if (deletedItemList.length === 0) {
        return {
          ...state,
          nowItemIndex: null,
          shopItems: deletedItemList,
        }
      } else if (action.index !== 0) {
        // select above
        return {
          ...state,
          nowItemIndex: action.index - 1,
          shopItems: deletedItemList,
        }
      } else {
        // select below
        return {
          ...state,
          nowItemIndex: 0,
          shopItems: deletedItemList,
        }
      }
    case "select":
      return {
        ...state,
        nowItemIndex: action.index,
      }
    case "sync":
      const { nowItemIndex, shopItems } = action.value
      return {
        nowItemIndex: nowItemIndex,
        shopItems: shopItems,
      }
    case "import":
      if (action.overwrite) {
        return {
          ...state,
          shopItems: [...action.value],
          nowItemIndex: null,
        }
      } else {
        const concat = [...state.shopItems, ...action.value]
        return {
          ...state,
          shopItems: concat.map((item, index) => {
            item.id = index
            return item
          }),
        }
      }
  }
}
type ContextValue = {
  globalState: GlobalState
  setGlobalState: React.Dispatch<GlobalAction>
}

const ItemStore = createContext({} as ContextValue)
const initialState: GlobalState = {
  shopItems: [],
  nowItemIndex: null,
}

const ItemStoreProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const syncData = async () => {
    const items = await getChromeStorage()
    dispatch({ type: "sync", value: items.cakev2 })
  }

  useEffect(() => {
    // on mounted
    syncData()
  }, [dispatch])

  useEffect(() => {
    // on state changed
    setChromeStorage(state)
  }, [state.shopItems, state.nowItemIndex])

  return (
    <ItemStore.Provider
      value={{ globalState: state, setGlobalState: dispatch }}
    >
      {children}
    </ItemStore.Provider>
  )
}

export { ItemStoreProvider, ItemStore, GlobalState, GlobalAction }
