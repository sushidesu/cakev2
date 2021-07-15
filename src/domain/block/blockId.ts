import { v4 as uuidv4 } from "uuid"
export class BlockId {
  private constructor(public readonly value: string) {}

  public static create(): BlockId {
    const id = uuidv4()
    return new BlockId(id)
  }
}
