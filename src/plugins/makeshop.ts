import { IShopItem } from "../shopItem"

export const write_to_makeshop = (item: IShopItem) => {
  const frame = document.querySelector("[name='mainframe']") as HTMLFrameElement
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

  const item_name = form.getElementById("brandname") as HTMLInputElement
  item_name.value = item.name

  const item_price = form.getElementById("sellprice") as HTMLInputElement
  item_price.value = item.price

  const item_jancode = form.getElementById("jancode_input") as HTMLInputElement
  item_jancode.value = item.jancode

  const item_stock = form.querySelector('[name="quantity"]') as HTMLInputElement
  item_stock.value = item.stockMakeshop

  const item_weight = form.querySelector('[name="weight"]') as HTMLInputElement
  item_weight.value = item.weight

  const description_sp = form.getElementById(
    "smartphone_content2"
  ) as HTMLTextAreaElement
  description_sp.value =
    Description(item.descriptions, item.imageURL) + Details(item.details)

  const description_pc =
    (form.querySelector("#cke_1_contents > textarea") as HTMLTextAreaElement) ||
    (() => {
      form.getElementById("cke_23").click()
      return form.querySelector(
        "#cke_1_contents > textarea"
      ) as HTMLTextAreaElement
    })()
  description_pc.value = Description(item.descriptions, item.imageURL)

  const details_pc =
    (form.querySelector("#cke_2_contents > textarea") as HTMLTextAreaElement) ||
    (() => {
      form.getElementById("cke_87").click()
      return form.querySelector(
        "#cke_2_contents > textarea"
      ) as HTMLTextAreaElement
    })()
  details_pc.value = Details(item.details)
}

const Description = (
  descriptions: IShopItem["descriptions"],
  image: IShopItem["imageURL"]
) => `
<div>
  ${image && `<img src="${image}">`}
  ${descriptions
    .map(
      desc => `
  <h2>${desc.title}</h2>
  <p>${desc.body}</p>
  `
    )
    .join("")}
</div>
`
const Details = (details: IShopItem["details"]) => {
  if (details.length === 0) return ""

  return `
<h2>商品詳細</h2>
<table>
  <tbody>
    ${details
      .map(
        detail => `
    <tr>
      <th>${detail.title}</th>
      <td>${detail.body}</td>
    </tr>
    `
      )
      .join("")}
  </tbody>
</table>
`
}
