import { Item } from "../../domain/item/item"
import { JsonClientInterface } from "../../usecase/interface/json-client-interface"
import { JSONScheme, JSONScheme_V2 } from "./interface/scheme"
import { JSONShcemeConverter } from "./json-scheme-converter"
import { SchemeV2Client } from "../scheme-v2-client/scheme-v2-client"

const hasOwn = Object.prototype.hasOwnProperty
export class JSONFileClient implements JsonClientInterface {
  private converter: JSONShcemeConverter
  private scheme_v2_converter: SchemeV2Client
  public constructor() {
    this.converter = new JSONShcemeConverter()
    this.scheme_v2_converter = new SchemeV2Client()
  }

  /**
   * 既存のデータを上書きしないように、商品IDは必ず新規生成する
   */
  public getItemsFromJSONFile(json: unknown): Item[] {
    console.log("IMPORT JSON", { json })

    let items: Item[]
    // --- PARSE ---
    if (this.isCakeV3(json)) {
      console.log("import v3")
      // convert V3 -> items
      items = Object.values(json.items)
        .sort((a, b) => a.order - b.order)
        .map((itemJson) => this.converter.JSON_V3ToEntity(itemJson))
    } else if (this.isCakeV2(json)) {
      // case V2
      console.log("import v2")
      const storage_v2 = json
      // convert V2 -> V3 -> items
      const storage_v3 = this.scheme_v2_converter.convertStorageV2ToV3(
        storage_v2.cakev2
      )
      items = Object.values(storage_v3.items)
        .sort((a, b) => a.order - b.order)
        .map((item) => this.converter.JSON_V3ToEntity(item))
    } else {
      // case unknown
      throw Error("インポートに失敗しました。対応していないファイルです。")
    }

    return items
  }

  private isNotNullish(object: unknown): object is Record<string, unknown> {
    return object != null
  }
  private isCakeV3(object: unknown): object is JSONScheme {
    if (!this.isNotNullish(object)) {
      return false
    }

    return hasOwn.call(object, "version") && hasOwn.call(object, "items")
  }
  private isCakeV2(object: unknown): object is JSONScheme_V2 {
    if (!this.isNotNullish(object)) {
      return false
    }

    return hasOwn.call(object, "cakev2")
  }

  public exportItemsAsJSONFile(items: Item[]): JSONScheme {
    console.log("EXPORT FILE", { items })

    return {
      version: 3,
      items: Object.fromEntries(
        items
          .map((item, index) => this.converter.entityToJSON(item, index))
          .map((item) => [item.id, item])
      ),
    }
  }
}
