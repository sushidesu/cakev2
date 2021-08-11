import { Item } from "../../domain/item/item"

export interface JsonClientInterface {
  getItemsFromJSONFile(file: File): Item[]
  exportItemsAsJSONFile(items: Item[]): File
}
