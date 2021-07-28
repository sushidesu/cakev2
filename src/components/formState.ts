import { useReducer } from "react"
import {
  IShopItem,
  SingleItemFields,
  MultipleItemFields,
  ItemText,
  initialItem,
} from "../shopItem"
import { validation } from "./formValidation"

export type FormState = {
  value: {
    [T in keyof IShopItem]: IShopItem[T]
  }
  message: {
    [T in keyof IShopItem]: string
  }
}

type SetFieldAciton<T extends keyof IShopItem> = {
  type: "setField"
  field: T
  value: IShopItem[T]
}

type FormAction =
  | {
      type: "initField"
    }
  | {
      type: "select"
      value: IShopItem
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

const reducer = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
    case "initField":
      return initialState

    case "select":
      return {
        ...initialState,
        value: action.value,
        message: initialMsg,
      }

    case "setField":
      const newmessage = {
        ...state.message,
        [action.field]: validation(action.field, action.value),
      }
      const newvalue = {
        ...state.value,
        [action.field]: action.value,
      }
      return {
        message: newmessage,
        value: newvalue,
      }

    case "setMultipleField":
      const newValues = [...state.value[action.field]]
      newValues[action.index] = {
        ...state.value[action.field][action.index],
        [action.textType]: action.value,
      }
      return {
        ...state,
        value: {
          ...state.value,
          [action.field]: newValues,
        },
      }

    case "addMultipleFields":
      const addedMultipleValues = [...state.value[action.field]]
      addedMultipleValues.push({
        title: "",
        body: "",
        index: addedMultipleValues.length,
      })
      return {
        ...state,
        value: {
          ...state.value,
          [action.field]: addedMultipleValues,
        },
      }

    case "removeMultipleFields":
      const removedMultipleValues = [...state.value[action.field]]
      removedMultipleValues.pop()
      return {
        ...state,
        value: {
          ...state.value,
          [action.field]: removedMultipleValues,
        },
      }
  }
}

const initialMsg: FormState["message"] = {
  id: "",
  name: "",
  price: "",
  weight: "",
  stockRakuten: "",
  stockMakeshop: "",
  jancode: "",
  imageURL: "",
  descriptions: "",
  details: "",
}

const initialState: FormState = {
  value: initialItem,
  message: {
    id: "",
    name: "",
    price: "",
    weight: "",
    stockRakuten: "",
    stockMakeshop: "",
    jancode: "",
    imageURL: "",
    descriptions: "",
    details: "",
  },
}

export const useFormReducer = () => useReducer(reducer, initialState)

export type FormDispatch = React.Dispatch<FormAction>
