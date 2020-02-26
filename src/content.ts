import { getChromeStorage } from "./plugins/chromeAPI"
import { write_to_rakuten } from "./plugins/rakuten"
import { write_to_makeshop } from "./plugins/makeshop"
import { CheckboxState } from "./popup"

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

console.log("cakev2 loaded")
chrome.runtime.onMessage.addListener((message: CheckboxState, _, callback) => {
  autoWrite(message)
    .then(() => {
      callback("ok")
    })
    .catch(err => {
      console.log(err)
      callback(err.toString())
    })
  return true
})
