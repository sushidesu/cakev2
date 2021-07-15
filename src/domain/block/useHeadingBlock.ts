import { useState, useCallback } from "react"
import { EntityHookProps } from "../shared/entity"
import { Block } from "./block"
import { BlockId } from "./blockId"

export interface HeadingBlock extends Block {
  content: string
  changeContent: (newContent: string) => void
}

type ReconstructProps = {
  id: BlockId
  content: string
}

export const useHeadingBlock = (
  props: EntityHookProps<ReconstructProps>
): HeadingBlock => {
  const init = props.type === "create" ? "" : props.payload.content
  const [id] = useState<BlockId>(
    props.type === "create" ? BlockId.create() : props.payload.id
  )
  const [content, setContent] = useState<string>(init)

  const changeContent = useCallback((value: string) => {
    setContent(value)
  }, [])

  return {
    id,
    type: "heading",
    content,
    changeContent,
  }
}
