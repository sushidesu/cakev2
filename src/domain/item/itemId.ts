import { v4 as uuidv4 } from "uuid"
import { ValueObject } from "../shared/valueObject"

export class ItemId implements ValueObject<string, "itemId"> {
  _brand: "itemId" = "itemId"
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
