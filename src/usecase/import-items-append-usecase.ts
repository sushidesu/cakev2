import { IItemCollectionRepository } from "../domain/item/interface/itemCollectionRepository"
import { JsonClientInterface } from "./interface/json-client-interface"

export class ImportItemsAppendUsecase {
  constructor(
    private jsonClient: JsonClientInterface,
    private itemCollectionRepository: IItemCollectionRepository
  ) {}

  async exec(file: File): Promise<void> {
    // JSONから items を取得
    const json = file // TODO
    const items = await this.jsonClient.getItemsFromJSONFile(json)
    // items を storageに保存 (後ろに追加)
    await this.itemCollectionRepository.saveItems({ items })
  }
}
