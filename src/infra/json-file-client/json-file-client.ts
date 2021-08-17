import { Item } from "../../domain/item/item"
import { JsonClientInterface } from "../../usecase/interface/json-client-interface"
import { JSONScheme, JSONScheme_V2 } from "./interface/scheme"
import { YYYY_MM_DD_HHmmss } from "../../plugins/date"
import { JSONShcemeConverter } from "./json-scheme-converter"

const hasOwn = Object.prototype.hasOwnProperty
export class JSONFileClient implements JsonClientInterface {
  private converter: JSONShcemeConverter
  public constructor() {
    this.converter = new JSONShcemeConverter()
  }

  public getItemsFromJSONFile(file: File): Item[] {
    console.log("IMPORT FILE", { file })
    const str = "" // await this.readFile(file)
    const json = JSON.parse(str ?? "")

    // parse
    if (hasOwn.call(json, "version") && hasOwn.call(json, "items")) {
      // case V3
      const storage = json as JSONScheme
      // convert V3 -> items
    } else if (hasOwn.call(json, "cakev2")) {
      // case V2
      const storage = json as JSONScheme_V2
      // convert V2 -> V3 -> items
    } else {
      // case unknown
      throw Error("インポートに失敗しました。対応していないファイルです。")
    }

    return []
  }

  public exportItemsAsJSONFile(items: Item[]): void {
    console.log("EXPORT FILE", { items })

    const value: JSONScheme = {
      version: 3,
      items: Object.fromEntries(
        items
          .map(item => this.converter.entityToJSON(item))
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
