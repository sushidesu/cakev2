import React from "react"
import { BlockBase } from "../../domain/block/useBlock"
import { BlockId } from ".././../domain/block/blockId"
import { CustomBlock } from "../../domain/customBlock/block"
import { HeadingBlockEditor } from "./HeadingBlockEditor"
import { TextBlockEditor } from "./TextBlockEditor"
import { ImageBlockEditor } from "./ImageBlockEditor"
import { TableBlockEditor } from "./TableBlockEditor"

export type UpdateBlockFunction<Block extends BlockBase<any, any>> = (props: {
  id: BlockId
  mutation: (prev: Block) => Block
}) => void

export type BlockEditorProps<Block extends BlockBase<any, any>> = {
  block: Block
  update: UpdateBlockFunction<CustomBlock>
  remove: () => void
  moveUp: () => void
  moveDown: () => void
}

export type Props<Block extends BlockBase<any, any>> = {
  block: Block
  remove: () => void
  moveUp: () => void
  moveDown: () => void
}

export function BlockEditor({
  block,
  ...rest
}: BlockEditorProps<CustomBlock>): JSX.Element | null {
  switch (block.type) {
    case "heading":
      return <HeadingBlockEditor block={block} {...rest} />
    case "text":
      return <TextBlockEditor block={block} {...rest} />
    case "image":
      return <ImageBlockEditor block={block} {...rest} />
    case "table":
      return <TableBlockEditor block={block} {...rest} />
    default:
      return null
  }
}
