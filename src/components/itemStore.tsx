import React, { createContext, useReducer } from "react"
import { IShopItem, initialItem } from "../shopItem"

type State = {
  shopItems: IShopItem[],
  nowItemIndex: number,
  formValues: IShopItem
}
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
    type: "setField",
    field: keyof IShopItem,
    value: string
  }
  | {
    type: "initField",
    value: IShopItem
  }

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "update":
      if (action.item.id === null) {
        const newItem: IShopItem = {...action.item, id: state.shopItems.length}
        return {
          ...state,
          shopItems: [...state.shopItems, newItem]
        }
      } else {
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
        formValues: action.value
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
