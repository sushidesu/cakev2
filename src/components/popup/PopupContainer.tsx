import React, { useState } from "react"
import { PopupTemplate } from "./PopupTemplate"
import { Item } from "../../domain/item/item"
import { CheckboxState } from "./Checkbox"
import { Loading } from "../../shared/loading"
import { ChromeMessenger } from "../../infra/chrome-messenger/chrome-messenger"
import {
  AutoFillMessage,
  AutoFillResponse,
} from "../../infra/interface/auto-fill-message"
import { sleep } from "../../utils/sleep"

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
  itemLoading: Loading<Item | undefined>
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

  const [loading, setLoading] = useState(false)
  const [ok, setOk] = useState(false)
  const chromeMessenger = new ChromeMessenger<
    AutoFillMessage,
    AutoFillResponse
  >()
  const autoFill = async () => {
    setLoading(true)
    const response = await chromeMessenger.sendMessage({
      fillDescription: checkbox.descriptions,
      fillInfo: checkbox.info,
      fillStock: checkbox.stock,
    })
    if (!response.ok) {
      window.alert(`エラー: ${response.message}`)
      setOk(false)
      setLoading(false)
    } else {
      await sleep(600)
      setOk(true)
      setLoading(false)
    }
  }

  switch (itemLoading.status) {
    case "loading":
      return <div>loading...</div>
    case "error":
      return <div>An error has occurred</div>
    case "done":
      console.log(itemLoading.value)
      return (
        <PopupTemplate
          {...{
            itemName: itemLoading.value?.name,
            checkbox,
            check,
            autoFill,
            submitButtonProps: {
              loadingStatus: loading ? "loading" : ok ? "loaded" : "default",
              disabled: itemLoading.value === undefined,
              onClick: autoFill,
            },
          }}
        />
      )
    default:
      throw Error("unexpected status received.")
  }
}
