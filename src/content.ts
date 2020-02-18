import { getChromeStorage } from "./plugins/chromeAPI"
import { write_to_rakuten } from "./plugins/rakuten"
import { write_to_makeshop } from "./plugins/makeshop"
;(async () => {
  const items = await getChromeStorage()
  const { nowItemIndex, shopItems } = items.cakev2
  if (nowItemIndex === null) return

  const selected = shopItems[nowItemIndex]
  switch (window.location.host) {
    case "item.rms.rakuten.co.jp":
      write_to_rakuten(selected)
      break
    case "shop16.makeshop.jp":
      write_to_makeshop(selected)
      break
    default:
      break
  }
})()
