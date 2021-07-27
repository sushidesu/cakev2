import { v4 as uuidv4 } from "uuid"
import { ValueObject } from "../shared/valueObject"

export class BlockId implements ValueObject<string, "blockId"> {
  _brand: "blockId"
  private constructor(public readonly value: string) {}

  public static create(): BlockId {
    const id = uuidv4()
    return new BlockId(id)
  }

  public static reconstruct(value: string): BlockId {
    return new BlockId(value)
  }

  public equals(blockId: BlockId): boolean {
    return blockId.value === this.value
  }
}
