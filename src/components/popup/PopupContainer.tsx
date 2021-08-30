import React, { useState } from "react"
import { PopupTemplate } from "./PopupTemplate"
import { IShopItem } from "../../shopItem"
import { CheckboxState } from "./Checkbox"
import { Loading } from "../../shared/loading"
import { ChromeMessenger } from "../../infra/chrome-messenger/chrome-messenger"
import {
  AutoFillMessage,
  AutoFillResponse,
} from "../../infra/interface/auto-fill-message"

const checkedAll: CheckboxState = {
  all: true,
  info: true,
  stock: true,
  descriptions: true,
}

const unCheckedAll: CheckboxState = {
  all: false,
  info: false,
  stock: false,
  descriptions: false,
}

export type Props = {
  itemLoading: Loading<IShopItem>
}

export function PopupContainer({ itemLoading }: Props): JSX.Element {
  const [checkbox, setCheckbox] = useState(checkedAll)
  const check = (name: keyof CheckboxState) => {
    if (name === "all") {
      setCheckbox(checkbox.all ? unCheckedAll : checkedAll)
    } else {
      const result = {
        ...checkbox,
        [name]: !checkbox[name],
      }
      result.all = result.info && result.stock && result.descriptions
      setCheckbox(result)
    }
  }

  const chromeMessenger = new ChromeMessenger<
    AutoFillMessage,
    AutoFillResponse
  >()
  const autoFill = async () => {
    await chromeMessenger.sendMessage({
      fillDescription: checkbox.descriptions,
      fillInfo: checkbox.info,
      fillStock: checkbox.stock,
    })
  }

  switch (itemLoading.status) {
    case "loading":
      return <div>loading...</div>
    case "error":
      return <div>an error has occured</div>
    case "done":
      return (
        <PopupTemplate
          {...{
            item: itemLoading.value,
            checkbox,
            check,
            autoFill,
          }}
        />
      )
    default:
      throw Error("unexpected status recieved.")
  }
}
