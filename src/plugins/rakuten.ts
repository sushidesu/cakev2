import { IShopItem } from "../shopItem"
import { CheckboxState } from "../components/popup/Checkbox"
import { rakutenSPDescription } from "./rakutenSPDescription"

const setValue = (element: HTMLInputElement | null, value: string) => {
  if (!element) return
  try {
    element.value = value
    const event = new Event("input", { bubbles: true })
    element.dispatchEvent(event)
  } catch (err) {
    console.log(err)
  }
}

export const write_to_rakuten = (
  item: IShopItem,
  checked: CheckboxState
): void => {
  // 税別設定
  const tax_included_inputs = document.querySelectorAll<HTMLInputElement>(
    '[name="consumptionTax"]'
  )
  tax_included_inputs[1].click()

  if (checked.info) {
    // 商品番号にJANコードを入力
    const item_number = document.querySelector<HTMLInputElement>(
      '[name="itemNumber"]'
    )
    // item_number.value = item.jancode
    setValue(item_number, item.jancode)

    const item_name =
      document.querySelector<HTMLInputElement>('[name="item_name"]')
    // item_name.value = item.name
    setValue(item_name, item.name)

    const item_price = <HTMLInputElement>document.getElementById("salesPrice")
    // item_price.value = item.price
    setValue(item_price, item.price)
    item_price.focus()

    const item_jancode = document.querySelector<HTMLInputElement>(
      '[name="rcatalog_id"]'
    )
    // item_jancode.value = item.jancode
    setValue(item_jancode, item.jancode)
  }

  if (checked.stock) {
    const item_stock = document.querySelector<HTMLInputElement>(
      '[name="inventoryAmount"]'
    )
    const item_stock_hidden = document.querySelector<HTMLInputElement>(
      "#root > div.rms-layout > main > div.rms-content > div:nth-child(2) > div:nth-child(3) > div.rms-form.form-border.form-full > div:nth-child(1) > div.rms-form-col.rms-col > div > div > div > div.rms-col-auto > input[type=hidden]:nth-child(2)"
    )
    // item_stock.value = item.stockRakuten
    setValue(item_stock, item.stockRakuten)
    setValue(item_stock_hidden, item.stockRakuten)
  }

  if (checked.descriptions) {
    const description_sp = document.querySelector<HTMLInputElement>(
      "#root > div.rms-layout > main > div.rms-content > div:nth-child(2) > div:nth-child(7) > div.rms-form.form-border.form-full > div:nth-child(2) > div.rms-form-col.rms-col-20 > div > div > div > textarea"
    )
    const description_pc = document.querySelector<HTMLInputElement>(
      "#root > div.rms-layout > main > div.rms-content > div:nth-child(2) > div:nth-child(7) > div.rms-form.form-border.form-full > div:nth-child(3) > div.rms-form-col.rms-col-20 > div > div > div > textarea"
    )
    const description = `<div ="">
  ${item.imageURL && `<img width="100%" src="${item.imageURL}">`}
  ${Description(item.descriptions)}
  ${Details(item.details)}
</div ="">
`

    // description_sp.value = rakutenSPDescription(item)
    setValue(description_sp, rakutenSPDescription(item))
    // description_pc.value = description
    setValue(description_pc, description)
  }
}

const TITLE_STYLE =
  "font-size: 1.3em; font-weight: normal; border-bottom: 1px dashed #ccc; margin: 2.5em 0 1em 0;"
const PARAGRAPH_STYLE =
  "font-size: 1em; line-height: 1.8em; letter-spacing: 0.01em; margin-bottom: 2.5em;"
const TABLE_STYLE = "width: 100%; border-spacing: 0; border-collapse: collapse;"
const TABLE_HEADER = "font-weight: bold; background-color: #efefef; width: 22%;"
const TABLE_CELL = "padding: 10px; border: 1px solid #ccc;"

const Description = (descriptions: IShopItem["descriptions"]) => {
  return descriptions
    .map(
      (desc) => `
  <h2 ="" style="${TITLE_STYLE}">${desc.title}</h2 ="">
  <p ="" style="${PARAGRAPH_STYLE}">${desc.body}</p ="">
`
    )
    .join("")
}

const Details = (details: IShopItem["details"]) => {
  if (details.length === 0) return ""

  const body = details
    .map(
      (detail) => `
      <tr>
        <th ="" style="${TABLE_CELL} ${TABLE_HEADER}">${detail.title}</th ="">
        <td ="" style="${TABLE_CELL}">${detail.body}</td ="">
      </tr>
`
    )
    .join("")

  return `
  <h2 ="" style="${TITLE_STYLE}">商品詳細</h2 ="">
  <table ="" style="${TABLE_STYLE}">
    <tbody ="">
      ${body}
    </tbody ="">
  </table ="">
`
}
