import { v4 as uuidv4 } from "uuid"

export class ItemId {
  private constructor(public readonly value: string) {}

  public static create(): ItemId {
    const id = uuidv4()
    return new ItemId(id)
  }
  public static reconstruct(value: string): ItemId {
    return new ItemId(value)
  }

  public equals(itemId: ItemId): boolean {
    return itemId.value === this.value
  }
}
