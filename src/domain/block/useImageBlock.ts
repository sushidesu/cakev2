import { useCallback, useState } from "react"
import { EntityHookProps } from "../shared/entity"
import { Block } from "./block"
import { BlockId } from "./blockId"

export interface ImageBlock extends Block {
  imageUrl: string
  changeImageUrl: (newValue: string) => void
}

type ReconstructProps = {
  id: BlockId
  imageUrl: string
}

export const useImageBlock = (
  props: EntityHookProps<ReconstructProps>
): ImageBlock => {
  const [id] = useState(
    props.type === "create" ? BlockId.create() : props.payload.id
  )
  const [imageUrl, setImageUrl] = useState(
    props.type === "create" ? "" : props.payload.imageUrl
  )

  const changeImageUrl = useCallback((value: string) => {
    setImageUrl(value)
  }, [])

  return {
    id,
    type: "image",
    imageUrl,
    changeImageUrl,
  }
}
