import { Item } from "../../domain/item/item"
import { JsonClientInterface } from "../../usecase/interface/json-client-interface"
import { JSONScheme, JSONScheme_V2 } from "./interface/scheme"
import { YYYY_MM_DD_HHmmss } from "../../plugins/date"
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

  public getItemsFromJSONFile(file: File): Item[] {
    console.log("IMPORT FILE", { file })
    const str = "" // await this.readFile(file)
    const json = JSON.parse(str ?? "")

    let items: Item[]
    // --- PARSE ---
    if (hasOwn.call(json, "version") && hasOwn.call(json, "items")) {
      // case V3
      const storage = json as JSONScheme
      // convert V3 -> items
      items = Object.values(storage.items)
        .sort((a, b) => a.order - b.order)
        .map(itemJson => this.converter.JSON_V3ToEntity(itemJson))
    } else if (hasOwn.call(json, "cakev2")) {
      // case V2
      const storage_v2 = json as JSONScheme_V2
      // convert V2 -> V3 -> items
      const storage_v3 = this.scheme_v2_converter.storageV2ToV3(
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

  public exportItemsAsJSONFile(items: Item[]): void {
    console.log("EXPORT FILE", { items })

    const value: JSONScheme = {
      version: 3,
      items: Object.fromEntries(
        items
          .map((item, index) => this.converter.entityToJSON(item, index))
          .map(item => [item.id, item])
      ),
    }
    const encoded = encodeURIComponent(JSON.stringify(value))
    const url = `data:text/json;charset=utf-8,${encoded}`
    const date = YYYY_MM_DD_HHmmss()
    const fileName = `item-list-${date}.json`

    chrome.downloads.download({
      url,
      filename: fileName,
    })
  }

  private readFile(file: File): Promise<string | undefined> {
    const reader = new FileReader()
    reader.readAsText(file)

    return new Promise<string | undefined>(resolve => {
      reader.onload = (ev: ProgressEvent<FileReader>) => {
        ev.target?.result && typeof ev.target.result === "string"
          ? resolve(ev.target.result)
          : resolve(undefined)
      }
    })
  }
}
