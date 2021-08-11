import { Item } from "../domain/item/item"
import { JsonClientInterface } from "./interface/json-client-interface"
import { IItemCollectionRepository } from "../domain/item/interface/itemCollectionRepository"

export class ExportAllItemsUsecase {
  constructor(
    private JSONClient: JsonClientInterface,
    private itemCollectionRepository: IItemCollectionRepository
  ) {}

  exec(items: Item[]): File {
    const jsonFile = this.JSONClient.exportItemsAsJSONFile(items)
    return jsonFile
  }
}
