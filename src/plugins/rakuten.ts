import { IShopItem } from "../shopItem"
import { CheckboxState } from "../popup"

export const write_to_rakuten = (
  item: IShopItem,
  checked: CheckboxState
): void => {
  // 税別設定
  const tax_not_included = document.getElementById("r03") as HTMLInputElement
  tax_not_included.checked = true

  if (checked.info) {
    // 商品番号にJANコードを入力
    const item_number = document.querySelector(
      '[name="item_number"]'
    ) as HTMLInputElement
    item_number.value = item.jancode

    const item_name = document.querySelector(
      '[name="item_name"]'
    ) as HTMLInputElement
    item_name.value = item.name

    const item_price = document.querySelector(
      '[name="price"]'
    ) as HTMLInputElement
    item_price.value = item.price

    const item_jancode = document.querySelector(
      '[name="rcatalog_id"]'
    ) as HTMLInputElement
    item_jancode.value = item.jancode
  }

  if (checked.stock) {
    const item_stock = document.getElementById(
      "invnew_in01"
    ) as HTMLInputElement
    item_stock.value = item.stockRakuten
  }

  if (checked.descriptions) {
    const description_sp = document.getElementById(
      "smart_caption"
    ) as HTMLInputElement
    const description_pc = document.querySelector(
      '[name="display_caption"]'
    ) as HTMLInputElement

    const description = `<div ="">
  ${item.imageURL && `<img width="100%" src="${item.imageURL}">`}
  ${Description(item.descriptions)}
  ${Details(item.details)}
</div ="">
`

    description_sp.value = description
    description_pc.value = description
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
      desc => `
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
      detail => `
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
    <tbody>
      ${body}
    </tbody>
  </table ="">
`
}
