import { Item } from "../domain/item/item"
import { JsonClientInterface } from "./interface/json-client-interface"
import { IItemCollectionRepository } from "../domain/item/interface/itemCollectionRepository"

export class ExportItemsUsecase {
  constructor(
    private JSONClient: JsonClientInterface,
    private itemCollectionRepository: IItemCollectionRepository
  ) {}

  exec(items: Item[]): void {
    this.JSONClient.exportItemsAsJSONFile(items)
  }
}
