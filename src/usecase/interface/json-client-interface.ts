import { Item } from "../../domain/item/item"
import { JSONScheme } from "../../infra/json-file-client/interface/scheme"

export interface JsonClientInterface {
  getItemsFromJSONFile(json: unknown): Item[]
  exportItemsAsJSONFile(items: Item[]): JSONScheme
}
