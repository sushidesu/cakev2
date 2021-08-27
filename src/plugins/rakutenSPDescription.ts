import { IShopItem } from "../shopItem"
import pretty from "html-prettify"

export const rakutenSPDescription = (item: IShopItem): string => {
  // image
  const image_section = item.imageURL
    ? `<img width="100%" src="${item.imageURL}" >`
    : ""

  // contents
  const contents_section = `
    ${item.descriptions
      .map(
        (text) => `
      <br>
      <p><b><font size="3">${text.title}</font></b></p>
      <p><font color="#565656">${text.body}</font></p>
      <br>
      <hr size="1" color="#ebebeb">
    `
      )
      .join("")}
  `

  // details
  const details_section = item.details.length
    ? `
  <br>
  <p><b><font size="3">商品詳細</font></b></p>
  <table cellpadding="4px" width="100%">
    ${item.details
      .map(
        (text, i) => `
      ${
        i !== 0
          ? `<tr><td colspan="2"><hr size="1" color="#ebebeb"></td></tr>`
          : ""
      }
      <tr>
        <th width="24%">${text.title}</th>
        <td>${text.body}</td>
      </tr>
    `
      )
      .join("")}
  </table>
  `
    : ""

  const html = [image_section, contents_section, details_section].join("\n")
  return pretty(html)
}
