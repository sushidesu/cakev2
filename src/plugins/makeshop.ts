import { IShopItem } from "../shopItem"
import { CheckboxState } from "../popup"

export const write_to_makeshop = (
  item: IShopItem,
  checked: CheckboxState
): void => {
  const frame = document.querySelector("[name='mainframe']") as HTMLFrameElement
  if (!frame.contentWindow) {
    return
  }
  const form = frame.contentWindow.document

  // ポイント => 1%
  const point_type = form.getElementById("reserve_type") as HTMLSelectElement
  point_type.selectedIndex = 1
  const point = form.getElementById("reserve") as HTMLInputElement
  point.value = "1"
  // 数量設定 => 数量
  const count = form.querySelectorAll(
    "input[type=radio][name=checkquantity]"
  )[2] as HTMLInputElement
  count.click()

  if (checked.info) {
    const item_name = form.getElementById("brandname") as HTMLInputElement
    item_name.value = item.name

    const item_price = form.getElementById("sellprice") as HTMLInputElement
    item_price.value = item.price

    const item_jancode = form.getElementById(
      "jancode_input"
    ) as HTMLInputElement
    item_jancode.value = item.jancode

    const item_weight = form.querySelector(
      '[name="weight"]'
    ) as HTMLInputElement
    item_weight.value = item.weight
  }

  if (checked.stock) {
    const item_stock = form.querySelector(
      '[name="quantity"]'
    ) as HTMLInputElement
    item_stock.value = item.stockMakeshop
  }

  if (checked.descriptions) {
    const description_sp = form.getElementById(
      "smartphone_content2"
    ) as HTMLTextAreaElement
    description_sp.value =
      Description(item.descriptions, item.imageURL) + Details(item.details)

    const description_pc =
      (form.querySelector(
        "#cke_1_contents > textarea"
      ) as HTMLTextAreaElement) ||
      (() => {
        form.getElementById("cke_23")?.click()
        return form.querySelector(
          "#cke_1_contents > textarea"
        ) as HTMLTextAreaElement
      })()
    description_pc.value = Description(item.descriptions, item.imageURL)

    const details_pc =
      (form.querySelector(
        "#cke_2_contents > textarea"
      ) as HTMLTextAreaElement) ||
      (() => {
        form.getElementById("cke_87")?.click()
        return form.querySelector(
          "#cke_2_contents > textarea"
        ) as HTMLTextAreaElement
      })()
    details_pc.value = Details(item.details)
  }
}

const TITLE_STYLE =
  "font-size: 1.3em; font-weight: normal; border-bottom: 1px dashed #ccc; margin: 2.5em 0 1em 0;"
const PARAGRAPH_STYLE =
  "font-size: 1em; line-height: 1.8em; letter-spacing: 0.01em; margin-bottom: 2.5em;"
const TABLE_STYLE = "width: 100%; border-spacing: 0; border-collapse: collapse;"
const TABLE_HEADER = "font-weight: bold; background-color: #efefef; width: 22%;"
const TABLE_CELL = "padding: 10px; border: 1px solid #ccc;"

const Description = (
  descriptions: IShopItem["descriptions"],
  image: IShopItem["imageURL"]
): string => `
<div>
  ${image && `<img src="${image}">`}
  ${descriptions
    .map(
      (desc) => `
  <h3 style="${TITLE_STYLE}">${desc.title}</h3>
  <p style="${PARAGRAPH_STYLE}">${desc.body}</p>
  `
    )
    .join("")}
</div>
`
const Details = (details: IShopItem["details"]): string => {
  if (details.length === 0) return ""

  return `
<h3 style="${TITLE_STYLE}">商品詳細</h3>
<table style="${TABLE_STYLE}">
  <tbody>
    ${details
      .map(
        (detail) => `
    <tr>
      <th style="${TABLE_CELL} ${TABLE_HEADER}">${detail.title}</th>
      <td style="${TABLE_CELL}">${detail.body}</td>
    </tr>
    `
      )
      .join("")}
  </tbody>
</table>
`
}
