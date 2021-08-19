import { Item } from "../domain/item/item"
import { JsonClientInterface } from "./interface/json-client-interface"

export class ExportItemsUsecase {
  constructor(private JSONClient: JsonClientInterface) {}

  exec(items: Item[]): void {
    this.JSONClient.exportItemsAsJSONFile(items)
  }
}
