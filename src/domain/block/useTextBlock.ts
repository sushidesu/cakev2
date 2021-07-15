import { useCallback, useState } from "react"
import { EntityHookProps } from "../shared/entity"
import { Block, BlockTypes } from "./block"
import { BlockId } from "./blockId"

export interface TextBlock extends Block {
  content: string
  changeContent: (newValue: string) => void
}

type ReconstructProps = {
  id: BlockId
  content: string
}
export const useTextBlock = (
  props: EntityHookProps<ReconstructProps>
): TextBlock => {
  const [id] = useState(
    props.type === "create" ? BlockId.create() : props.payload.id
  )
  const [content, setContent] = useState(
    props.type === "create" ? "" : props.payload.content
  )

  const changeContent = useCallback((value: string) => {
    setContent(value)
  }, [])

  return {
    id,
    type: "text",
    content,
    changeContent,
  }
}
