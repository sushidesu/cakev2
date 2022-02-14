import { CustomBlock } from "../../domain/customBlock/block"
import { Item } from "../../domain/item/item"
import { IAutomaticInputClient } from "../../usecase/automatic-input-usecase/interface/automatic-input-client"

export class AutomaticInputMakeshopClient implements IAutomaticInputClient {
  form: Document
  constructor() {
    const frame = document.querySelector(
      "[name='mainframe']"
    ) as HTMLFrameElement
    if (!frame.contentWindow) throw Error("contentWindow is null")
    this.form = frame.contentWindow?.document
  }

  beforeInput(): void {
    // 「ポイント」 の単位を 「％」 にする
    const point_type = this.form.getElementById(
      "reserve_type"
    ) as HTMLSelectElement
    point_type.selectedIndex = 1
    // 「ポイント」 を 「1％」 にする
    const point = this.form.getElementById("reserve") as HTMLInputElement
    point.value = "1"
  }

  inputInfo(item: Item): void {
    console.log("write info")
    // 「商品名」
    const item_name = this.form.getElementById("brandname") as HTMLInputElement
    item_name.value = item.name
    // 「販売価格」
    const item_price = this.form.getElementById("sellprice") as HTMLInputElement
    item_price.value = item.price.toString()
    // 「JANコード」
    const item_jancode = this.form.getElementById(
      "jancode_input"
    ) as HTMLInputElement
    item_jancode.value = item.jancode?.toString() ?? ""
    // 「重量」
    const item_weight = this.form.querySelector(
      '[name="weight"]'
    ) as HTMLInputElement
    item_weight.value = item.weight.toString()
  }

  inputStock(item: Item): void {
    console.log("write stock")
    // 「数量」 タイプを 「数量」 に設定
    const count = this.form.querySelectorAll(
      "input[type=radio][name=checkquantity]"
    )[2] as HTMLInputElement
    count.click()

    // 「数量」
    const item_stock = this.form.querySelector(
      '[name="quantity"]'
    ) as HTMLInputElement
    item_stock.value = item.stockMakeshop.toString()
  }

  WRAPPER_CLASS_NAME = "item-description-generated-by-cake"

  inputDescriptions(item: Item): void {
    console.log("write descriptions")

    const text = `<div class="${this.WRAPPER_CLASS_NAME}">${item.blocks
      .map(this.blockToHtml)
      .join("\n\n")}</div>`

    // 「スマホ用商品説明文1」
    const description_sp = this.form.getElementById(
      "smartphone_content2"
    ) as HTMLTextAreaElement
    description_sp.value = text

    // 「PC用商品説明文」
    this.enableSourceEditMode("PC_MAIN")

    // NOTE: ソース編集モードが有効の場合のみ、textareaが表示される
    const description_pc = this.form.querySelector("#cke_1_contents > textarea")
    if (!description_pc) {
      throw new Error(`"#cke_1_contents > textarea" is not found.`)
    }

    if (!this.isTextAreaElementInElementContext(description_pc)) {
      throw new Error(
        `"#cke_1_contents > textarea" is not instance of HTMLTextAreaElement. It's "${description_pc.constructor.name}".`
      )
    }
    description_pc.value = text
  }

  /**
   * 「PC追加商品説明文」「スマホ用商品説明文2」を入力する
   */
  inputSubDescriptions(item: Item): void {
    const text = `<div class="${this.WRAPPER_CLASS_NAME}">${item.subBlocks
      .map(this.blockToHtml)
      .join("\n\n")}</div>`

    // 「PC追加商品説明文」のソース編集モードを有効化
    this.enableSourceEditMode("PC_SUB")

    // 「PC用商品説明文」
    const SUB_PC_TEXTAREA_QUERY = "#cke_2_contents > textarea"
    const sub_description_pc = this.form.querySelector(SUB_PC_TEXTAREA_QUERY)

    if (!sub_description_pc) {
      throw new Error(`"${SUB_PC_TEXTAREA_QUERY}" is not found.`)
    }
    if (!this.isTextAreaElementInElementContext(sub_description_pc)) {
      throw new Error(
        `"${SUB_PC_TEXTAREA_QUERY}" is not instance of HTMLTextAreaElement`
      )
    }
    sub_description_pc.value = text

    // 「スマートフォン用商品説明文2」
    const SUB_SP_ID = "smartphone_content1"
    const sub_description_sp = this.form.getElementById(SUB_SP_ID)

    if (!sub_description_sp) {
      throw new Error(`"${SUB_SP_ID}" is not found`)
    }
    if (!this.isTextAreaElementInElementContext(sub_description_sp)) {
      throw new Error(`"${SUB_SP_ID}" is not instance of HTMLTextAreaElement`)
    }
    sub_description_sp.value = text
  }

  /**
   * ソース編集モードを有効化する
   */
  private enableSourceEditMode(target: "PC_MAIN" | "PC_SUB") {
    const SOURCE_EDIT_BUTTON_ID = {
      // NOTE: 現在「ソース」ボタンのidは `cke_26` となっているが、以前は `cke_23` だった？
      PC_MAIN: "cke_26",
      PC_SUB: "cke_93",
    }
    const button_pc_source_edit = this.form.getElementById(
      SOURCE_EDIT_BUTTON_ID[target]
    )
    if (button_pc_source_edit === null) {
      throw new Error(
        `element "#${SOURCE_EDIT_BUTTON_ID[target]}" is not found.`
      )
    }
    // ソース編集モードを有効にする
    // 既にソース編集モードが有効の場合は「ソース」ボタンを押さない
    const enable_source_edit_mode =
      button_pc_source_edit.getAttribute("aria-pressed")
    if (
      enable_source_edit_mode === null ||
      enable_source_edit_mode !== "true"
    ) {
      // 初期状態では `aria-pressed` 属性はつかない
      button_pc_source_edit.click()
    }
  }

  private isTextAreaElementInElementContext(
    element: Element
  ): element is HTMLTextAreaElement {
    const ElementContextTextAreaElement =
      element.ownerDocument.defaultView?.HTMLTextAreaElement
    if (!ElementContextTextAreaElement) {
      return false
    }

    return element instanceof ElementContextTextAreaElement
  }

  private blockToHtml(block: CustomBlock): string {
    switch (block.type) {
      case "heading":
        return `<h3>${block.value.content}</h3>`
      case "text":
        return `<p>${block.value.content}</p>`
      case "image":
        return `<img src="${block.value.imageUrl}">`
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
}
