import { Item } from "../domain/item/item"
import { JsonClientInterface } from "./interface/json-client-interface"
import { FileIOClientInterface } from "./interface/file-io-client"

export class ExportItemsUsecase {
  constructor(
    private JSONClient: JsonClientInterface,
    private fileIO: FileIOClientInterface
  ) {}

  /**
   * XXXX.json としてエクスポートする
   */
  exec(items: Item[]): void {
    const json = this.JSONClient.exportItemsAsJSONFile(items)
    this.fileIO.export(json)
  }
}
