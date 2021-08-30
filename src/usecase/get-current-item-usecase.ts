import { Item } from "../domain/item/item"
import { IItemCollectionRepository } from "../domain/item/interface/itemCollectionRepository"

export class GetCurrentItemUsecase {
  constructor(private itemCollectionRepository: IItemCollectionRepository) {}

  async exec(): Promise<Item | undefined> {
    const id = await this.itemCollectionRepository.getSelectedItemId()
    if (id === null) return undefined

    const items = await this.itemCollectionRepository.getAllItems()
    return items.find((item) => item.id.equals(id))
  }
}
