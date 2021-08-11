import { Item } from "../domain/item/item"
import { JsonClientInterface } from "../usecase/interface/json-client-interface"

export class JSONFileClient implements JsonClientInterface {
  constructor() {}

  getItemsFromJSONFile(): Item[] {
    // TODO
    console.log("IMPORT FILE")
    return []
  }

  exportItemsAsJSONFile(): File {
    // TODO
    console.log("EXPORT FILE")
    return new File([], "hoge.test")
  }
}
