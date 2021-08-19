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

  public getItemsFromJSONFile(json: any): Item[] {
    console.log("IMPORT JSON", { json })

    let items: Item[]
    // --- PARSE ---
    if (hasOwn.call(json, "version") && hasOwn.call(json, "items")) {
      // case V3
      console.log("import v3")
      const storage = json as JSONScheme
      // convert V3 -> items
      items = Object.values(storage.items)
        .sort((a, b) => a.order - b.order)
        .map(itemJson => this.converter.JSON_V3ToEntity(itemJson))
    } else if (hasOwn.call(json, "cakev2")) {
      // case V2
      console.log("import v2")
      const storage_v2 = json as JSONScheme_V2
      // convert V2 -> V3 -> items
      const storage_v3 = this.scheme_v2_converter.convertStorageV2ToV3(
        storage_v2.cakev2
      )
      items = Object.values(storage_v3.items)
        .sort((a, b) => a.order - b.order)
        .map(item => this.converter.JSON_V3ToEntity(item))
    } else {
      // case unknown
      throw Error("インポートに失敗しました。対応していないファイルです。")
    }

    return items
  }

  public exportItemsAsJSONFile(items: Item[]): JSONScheme {
    console.log("EXPORT FILE", { items })

    return {
      version: 3,
      items: Object.fromEntries(
        items
          .map((item, index) => this.converter.entityToJSON(item, index))
          .map(item => [item.id, item])
      ),
    }
  }
}
