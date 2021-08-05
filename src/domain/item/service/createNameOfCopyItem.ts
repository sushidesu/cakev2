import { Item } from "../item"

export class CreateNameOfCopyItem {
  constructor(private itemList: Item[]) {}

  exec(targetName: string): string {
    const itemsDuplicateName = this.itemList.filter(
      item => item.name.slice(0, targetName.length) === targetName
    )
    const suffix = itemsDuplicateName.length + 1
    return `${targetName}_${suffix}`
  }
}
