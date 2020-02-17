import { getChromeStorage } from "./plugins/chromeAPI"
import { write_to_rakuten } from "./plugins/rakuten"
;(async () => {
  const items = await getChromeStorage()
  const { nowItemIndex, shopItems } = items.cakev2
  if (nowItemIndex === null) return

  const selected = shopItems[nowItemIndex]
  console.log(selected)
  write_to_rakuten(selected)
})()
