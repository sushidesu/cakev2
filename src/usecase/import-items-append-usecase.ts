import { IItemCollectionRepository } from "../domain/item/interface/itemCollectionRepository"
import { JsonClientInterface } from "./interface/json-client-interface"
import { FileIOClientInterface } from "./interface/file-io-client"

export class ImportItemsAppendUsecase {
  constructor(
    private jsonClient: JsonClientInterface,
    private itemCollectionRepository: IItemCollectionRepository,
    private fileIO: FileIOClientInterface
  ) {}

  async exec(file: File): Promise<void> {
    // JSON file から items を取得
    const json = this.fileIO.load(file)
    const items = await this.jsonClient.getItemsFromJSONFile(json)
    // items を storageに保存 (後ろに追加)
    await this.itemCollectionRepository.saveItems({ items })
  }
}
