import { Item } from "../../domain/item/item"
import { JSONScheme } from "../../infra/json-file-client/interface/scheme"

export interface JsonClientInterface {
  getItemsFromJSONFile(json: any): Item[]
  exportItemsAsJSONFile(items: Item[]): JSONScheme
}
