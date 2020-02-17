import { IShopItem } from "../shopItem"

export const write_to_rakuten = (item: IShopItem): void => {
  // 税別設定
  const tax_not_included = document.getElementById("r03") as HTMLInputElement
  tax_not_included.checked = true

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

  const item_stock = document.getElementById("invnew_in01") as HTMLInputElement
  item_stock.value = item.stockRakuten

  const item_jancode = document.querySelector(
    '[name="rcatalog_id"]'
  ) as HTMLInputElement
  item_jancode.value = item.jancode

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

const Description = (descriptions: IShopItem["descriptions"]) => {
  return descriptions
    .map(
      desc => `
  <h2 ="" style="font-size: 1.1rem; border-bottom: 2px dashed #ccc; font-family: sans-serif;">${desc.title}</h2 ="">
  <p ="" style="font-family: sans-serif;">${desc.body}</p ="">
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
    <th>${detail.title}</th>
    <td>${detail.body}</td>
  </tr>
`
    )
    .join("")

  return `
  <h2 ="">商品詳細</h2 ="">
  <table>
  ${body}
  </table>
`
}
