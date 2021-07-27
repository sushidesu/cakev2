import { BlockBase } from "./useBlock"

export type HeadingBlock = BlockBase<{ content: string }, "heading">
export type TextBlock = BlockBase<{ content: string }, "text">
export type ImageBlock = BlockBase<{ imageUrl: string }, "image">
export type TableBlock = BlockBase<
  {
    rows: TableRow[]
  },
  "table"
>

export type TableRow = {
  title: string
  body: string
}

export type CustomBlock = HeadingBlock | TextBlock | ImageBlock | TableBlock
