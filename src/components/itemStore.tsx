import React, { createContext, useReducer, useEffect } from "react"
import {
  IShopItem,
  ItemText,
  SingleItemFields,
  MultipleItemFields,
  initialItem,
} from "../shopItem"
import {
  getChromeStorage,
  setChromeStorage,
  ChromeStorageItem,
} from "../plugins/chromeAPI"

type State = {
  shopItems: IShopItem[]
  nowItemIndex: number
  formValues: IShopItem
}

type SetFieldAciton<T extends keyof IShopItem> = {
  type: "setField"
  field: T
  value: IShopItem[T]
}

type Action =
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
  | {
      type: "initField"
    }
  | SetFieldAciton<keyof SingleItemFields>
  | {
      type: "setMultipleField"
      field: keyof MultipleItemFields
      textType: keyof Pick<ItemText, "title" | "body">
      index: number
      value: string
    }
  | {
      type: "addMultipleFields"
      field: keyof MultipleItemFields
    }
  | {
      type: "removeMultipleFields"
      field: keyof MultipleItemFields
    }

const reducer = (state: State, action: Action): State => {
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
          formValues: newItem,
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
          formValues: initialItem,
          nowItemIndex: null,
          shopItems: deletedItemList,
        }
      } else if (action.index !== 0) {
        // select above
        return {
          ...state,
          formValues: deletedItemList[action.index - 1],
          nowItemIndex: action.index - 1,
          shopItems: deletedItemList,
        }
      } else {
        // select below
        return {
          ...state,
          formValues: deletedItemList[0],
          nowItemIndex: 0,
          shopItems: deletedItemList,
        }
      }
    case "select":
      return {
        ...state,
        nowItemIndex: action.index,
        formValues: {
          ...state.shopItems[action.index],
        },
      }
    case "sync":
      const { nowItemIndex, shopItems } = action.value
      return {
        nowItemIndex: nowItemIndex,
        shopItems: shopItems,
        formValues:
          nowItemIndex === null ? initialItem : shopItems[nowItemIndex],
      }
    case "import":
      if (action.overwrite) {
        return {
          ...state,
          shopItems: [...action.value],
          nowItemIndex: null,
          formValues: initialItem,
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
    case "setField":
      return {
        ...state,
        formValues: {
          ...state.formValues,
          [action.field]: action.value,
        },
      }
    case "initField":
      return {
        ...state,
        nowItemIndex: null,
        formValues: initialItem,
      }
    case "setMultipleField":
      const newValues = [...state.formValues[action.field]]
      newValues[action.index] = {
        ...state.formValues[action.field][action.index],
        [action.textType]: action.value,
      }
      return {
        ...state,
        formValues: {
          ...state.formValues,
          [action.field]: newValues,
        },
      }
    case "addMultipleFields":
      const addedMultipleValues = [...state.formValues[action.field]]
      addedMultipleValues.push({
        title: "",
        body: "",
        index: addedMultipleValues.length,
      })
      return {
        ...state,
        formValues: {
          ...state.formValues,
          [action.field]: addedMultipleValues,
        },
      }
    case "removeMultipleFields":
      const removedMultipleValues = [...state.formValues[action.field]]
      removedMultipleValues.pop()
      return {
        ...state,
        formValues: {
          ...state.formValues,
          [action.field]: removedMultipleValues,
        },
      }
  }
}
type ContextValue = {
  globalState: State
  setGlobalState: React.Dispatch<Action>
}

const ItemStore = createContext({} as ContextValue)
const initialState: State = {
  shopItems: [],
  nowItemIndex: null,
  formValues: initialItem,
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

export { ItemStoreProvider, ItemStore, State, Action }
