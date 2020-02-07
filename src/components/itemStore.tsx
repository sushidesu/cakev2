import React, { createContext, useReducer } from "react"
import { IShopItem, initialItem } from "../shopItem"

type State = {
  shopItems: IShopItem[],
  nowItemIndex: number,
  formValues: IShopItem
}

type SetFieldAciton<T extends keyof IShopItem> = {
  type: "setField",
  field: T,
  value: IShopItem[T]
}

type SetFieldActions = SetFieldAciton<keyof IShopItem>

type Action = 
  | {
    type: "update",
    item: IShopItem,
  }
  | {
    type: "select",
    index: number
  }
  | {
    type: "initField"
  }
  | SetFieldActions

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "update":
      if (action.item.id === null) {
        // new item
        const newItem: IShopItem = {...action.item, id: state.shopItems.length}
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
          shopItems: newItems
        }
      }

    case "select":
      return {
        ...state,
        nowItemIndex: action.index,
        formValues: {
          ...state.shopItems[action.index]
        }
      }
    case "setField":
      return {
        ...state,
        formValues: {
          ...state.formValues,
          [action.field]: action.value
        }
      }
    case "initField":
      return {
        ...state,
        nowItemIndex: null,
        formValues: initialItem
      }
  }
}
type ContextValue = {
  globalState: State,
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
  return (
    <ItemStore.Provider value={{ globalState: state, setGlobalState: dispatch }}>
      { children }
    </ItemStore.Provider>
  )
}

export { ItemStoreProvider, ItemStore, Action }
