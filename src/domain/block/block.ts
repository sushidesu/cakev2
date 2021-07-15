import { BlockId } from "./blockId"

export type BlockTypes = "heading" | "text" | "image" | "table"

export interface Block {
  readonly id: BlockId
  readonly type: BlockTypes
}
