import { Item } from "../item"
import { ItemInfoFormValue } from "../useItem"
import { IItemCollectionRepository } from "../interface/itemCollectionRepository"
import { ItemId } from "../itemId"
import { convertFormValue } from "../convertFormValue"

export type ItemCreateProps = {
  itemInfo: ItemInfoFormValue
  blocks: []
}

export class ItemFactory {
  constructor(private itemCollectionRepository: IItemCollectionRepository) {}

  async create({ itemInfo, blocks }: ItemCreateProps): Promise<Item> {
    const id = ItemId.create()

    const items = await this.itemCollectionRepository.getAllItems()
    const order = items.length + 1

    return {
      ...convertFormValue({ itemInfo, blocks }),
      id,
      order,
    }
  }
}
