import React, { useState, useEffect } from "react"
import { PopupTemplate } from "./PopupTemplate"
import { getChromeStorage } from "../../plugins/chromeAPI"
import { initialItem } from "../../shopItem"
import { CheckboxState } from "./Checkbox"

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

export function PopupContainer(): JSX.Element {
  const [item, setItem] = useState(initialItem)
  const fetchItem = async () => {
    const { cakev2 } = await getChromeStorage()
    const { nowItemIndex, shopItems } = cakev2
    setItem(nowItemIndex === null ? initialItem : shopItems[nowItemIndex])
  }
  useEffect(() => {
    // on mounted
    fetchItem()
  }, [setItem])

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

  const autoFill = () =>
    new Promise<any>((resolve) => {
      chrome.tabs.query(
        { active: true, windowId: chrome.windows.WINDOW_ID_CURRENT },
        (result) => {
          const tab = result[0]
          if (tab && tab.id) {
            chrome.tabs.sendMessage(tab.id, checkbox, (response) => {
              resolve(response)
            })
          }
        }
      )
    })

  return (
    <PopupTemplate
      {...{
        item,
        checkbox,
        check,
        autoFill,
      }}
    />
  )
}
