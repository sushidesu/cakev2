import { getChromeStorage } from "./plugins/chromeAPI"
import { write_to_rakuten } from "./plugins/rakuten"
import { write_to_makeshop } from "./plugins/makeshop"
import { CheckboxState } from "./components/popup/Checkbox"
import { ChromeMessenger } from "./infra/chrome-messenger/chrome-messenger"
import {
  AutoFillMessage,
  AutoFillResponse,
} from "./infra/interface/auto-fill-message"

const autoWrite = async (checked: CheckboxState) => {
  const items = await getChromeStorage()
  const { nowItemIndex, shopItems } = items.cakev2
  if (nowItemIndex === null) return

  const selected = shopItems[nowItemIndex]
  switch (window.location.host) {
    case "item.rms.rakuten.co.jp":
      write_to_rakuten(selected, checked)
      break
    case "shop16.makeshop.jp":
      write_to_makeshop(selected, checked)
      break
    default:
      throw "対応していないサイトです"
  }
}

const hoge = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("hoge")
    }, 3000)
  })
}

console.log("cakev2 loaded")
const chromeMessenger = new ChromeMessenger<AutoFillMessage, AutoFillResponse>()

chromeMessenger.addListener(async (message) => {
  try {
    if (message.fillStock) console.log("fill stock")
    if (message.fillInfo) console.log("fill info")
    const result = await hoge()
    console.log(result)
    if (message.fillDescription) console.log("fill description")

    return {
      ok: true,
    }
  } catch (err) {
    return {
      ok: false,
      message: err.toString(),
    }
  }
})
