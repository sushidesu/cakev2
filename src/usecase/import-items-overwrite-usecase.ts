import { IItemCollectionRepository } from "../domain/item/interface/itemCollectionRepository"
import { JsonClientInterface } from "./interface/json-client-interface"

export class ImportItemsOverwriteUsecase {
  constructor(
    private jsonClient: JsonClientInterface,
    private itemCollectionRepository: IItemCollectionRepository
  ) {}

  async exec(file: File): Promise<void> {
    // JSON から items を取得
    const json = file // TODO
    const items = await this.jsonClient.getItemsFromJSONFile(json)
    // storageを削除
    await this.itemCollectionRepository.clear()
    // itemsをstorageに全部保存
    await this.itemCollectionRepository.saveItems({ items })
  }
}
