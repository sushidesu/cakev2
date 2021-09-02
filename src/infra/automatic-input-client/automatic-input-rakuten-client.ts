import { CustomBlock } from "../../domain/customBlock/block"
import { Item } from "../../domain/item/item"
import { IAutomaticInputClient } from "../../usecase/automatic-input-usecase/interface/automatic-input-client"

export class AutomaticInputRakutenClient implements IAutomaticInputClient {
  beforeInput() {
    // not required
  }

  inputInfo(item: Item): void {
    // 「商品名」
    const item_name =
      document.querySelector<HTMLInputElement>('[name="item_name"]')
    this.setValue(item_name, item.name)

    // 「販売価格」
    const item_price = <HTMLInputElement>document.getElementById("salesPrice")
    this.setValue(item_price, item.price.toString())
    // このinputだけは特殊で、フォーカス -> どこかしらをクリック することで入力が反映される
    item_price.focus()
    // 「消費税」 の 「税別」 にチェックを入れる
    const tax_included_inputs = document.querySelectorAll<HTMLInputElement>(
      '[name="consumptionTax"]'
    )
    tax_included_inputs[1].click()

    // 「カタログID」 (JANコード)
    const jancode = item.jancode?.toString() ?? ""
    const item_jancode = document.querySelector<HTMLInputElement>(
      '[name="rcatalog_id"]'
    )
    this.setValue(item_jancode, jancode)

    // 「商品番号」にもJANコードを入力
    const item_number = document.querySelector<HTMLInputElement>(
      '[name="itemNumber"]'
    )
    this.setValue(item_number, jancode)
  }

  inputStock(item: Item): void {
    const item_stock = document.querySelector<HTMLInputElement>(
      '[name="inventoryAmount"]'
    )
    const item_stock_hidden = document.querySelector<HTMLInputElement>(
      "#root > div.rms-layout > main > div.rms-content > div:nth-child(2) > div:nth-child(3) > div.rms-form.form-border.form-full > div:nth-child(1) > div.rms-form-col.rms-col > div > div > div > div.rms-col-auto > input[type=hidden]:nth-child(2)"
    )
    const stock = item.stockRakuten.toString()
    this.setValue(item_stock, stock)
    this.setValue(item_stock_hidden, stock)
  }

  WRAPPER_CLASS_NAME: string = "item-description-generated-by-cake"
  inputDescriptions(item: Item): void {
    // 「PC用販売説明文」
    const description_pc = document.querySelector<HTMLInputElement>(
      "#root > div.rms-layout > main > div.rms-content > div:nth-child(2) > div:nth-child(7) > div.rms-form.form-border.form-full > div:nth-child(3) > div.rms-form-col.rms-col-20 > div > div > div > textarea"
    )
    // 「スマートフォン用商品説明文」
    const description_sp = document.querySelector<HTMLInputElement>(
      "#root > div.rms-layout > main > div.rms-content > div:nth-child(2) > div:nth-child(7) > div.rms-form.form-border.form-full > div:nth-child(2) > div.rms-form-col.rms-col-20 > div > div > div > textarea"
    )
    const text_sp = item.blocks
      .map((block, index) => this.blockToHTML_SP(block, index))
      .join("\n\n")
    const text_pc = `<div class="${this.WRAPPER_CLASS_NAME}">${item.blocks
      .map(this.blockToHTML_PC)
      .join("\n\n")}</div>`
    this.setValue(description_pc, text_pc)
    this.setValue(description_sp, text_sp)
  }

  private blockToHTML_PC(block: CustomBlock): string {
    switch (block.type) {
      case "heading":
        return `<h2>${block.value.content}</h2>`
      case "text":
        return `<p>${block.value.content}</p>`
      case "image":
        return `<img src="${block.value.imageUrl}" >`
      case "table":
        return `<table>
${block.value.rows
  .map(
    (row) => `  <tr>
    <th>${row.title}</th>
    <td>${row.body}</td>
  </tr>`
  )
  .join("\n")}
</table>`
    }
  }
  private blockToHTML_SP(block: CustomBlock, index: number): string {
    const BORDER_COLOR = "#ccc"
    const BORDER_WIDTH = "1"
    const TH_BG_COLOR = "#efefef"
    const TH_WIDTH = "22%"
    const TH_ALIGN = "left"
    const TH_FONT_SIZE = "+1"
    const TABLE_CELLPADDING = "10px"
    const TABLE_CELLSPACING = "0"
    const IMG_WIDTH = "100%"

    const maybe_br = this.new_line(block.type, index)
    switch (block.type) {
      case "heading":
        return (
          maybe_br +
          `<p><b><font size="${TH_FONT_SIZE}">${block.value.content}</font></b></p>`
        )
      case "text":
        return maybe_br + `<p>${block.value.content}</p>`
      case "image":
        return (
          maybe_br + `<img width="${IMG_WIDTH}" src="${block.value.imageUrl}">`
        )
      case "table":
        return (
          maybe_br +
          `<table cellpadding="${TABLE_CELLPADDING}" cellspacing="${TABLE_CELLSPACING}" border="${BORDER_WIDTH}" bordercolor="${BORDER_COLOR}">
${block.value.rows
  .map(
    (row) => `  <tr>
    <th width="${TH_WIDTH}" align="${TH_ALIGN}" bgcolor="${TH_BG_COLOR}">${row.title}</th>
    <td>${row.body}</td>
  </tr>`
  )
  .join("\n")}
</table>`
        )
    }
  }

  /**
   * 楽天スマホ用商品説明文ではmarginが使えないため、brタグで代替する
   */
  private new_line(blockType: CustomBlock["type"], index: number): BRSpacer {
    // 先頭の要素には余白をつけない
    if (index === 0) return ""

    // 大きめの余白
    if (blockType === "heading") {
      return "<br><br>"
    }

    // 小さめの余白
    return "<br>"
  }

  /**
   * なんとかしてreact製のinputに値をセットしたい
   * @param maybeElement element to set value
   * @param value value to set element
   */
  private setValue(maybeElement: HTMLInputElement | null, value: string): void {
    if (maybeElement === null) return
    const element = maybeElement
    try {
      element.value = value
      const event = new Event("input", { bubbles: true })
      element.dispatchEvent(event)
    } catch (err) {
      console.log(err)
    }
  }
}

type BRSpacer = "<br>" | "<br><br>" | ""
