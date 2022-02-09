import { useCallback, useMemo } from "react"
import { BlockEditorProps } from "../../components/editor/BlockEditor"
import { CustomBlock } from "../../domain/customBlock/block"
import { CustomBlockCollection } from "../../domain/customBlock/useCustomBlock"

type UseBlockHandlersResponse = {
  blocks: BlockEditorProps<CustomBlock>[]
  onAddHeadingClick: () => void
  onAddTextClick: () => void
  onAddImageClick: () => void
  onAddTableClick: () => void
}

export const useBlockHandlers = (
  collection: CustomBlockCollection
): UseBlockHandlersResponse => {
  const { blocks, addBlock, removeBlock, updateBlock, moveBlock } = collection

  const onAddHeadingClick = useCallback(() => {
    addBlock({ type: "heading" })
  }, [addBlock])

  const onAddTextClick = useCallback(() => {
    addBlock({ type: "text" })
  }, [addBlock])

  const onAddImageClick = useCallback(() => {
    addBlock({ type: "image" })
  }, [addBlock])

  const onAddTableClick = useCallback(() => {
    addBlock({ type: "table" })
  }, [addBlock])

  const blockProps = useMemo(() => {
    return blocks.map((block) => ({
      block: block,
      update: updateBlock,
      remove: () => {
        removeBlock({ id: block.id })
      },
      moveUp: () => {
        moveBlock({ id: block.id, type: "relative", offset: -1 })
      },
      moveDown: () => {
        moveBlock({ id: block.id, type: "relative", offset: 1 })
      },
    }))
  }, [blocks, updateBlock, removeBlock, moveBlock])

  return {
    blocks: blockProps,
    onAddHeadingClick,
    onAddTextClick,
    onAddImageClick,
    onAddTableClick,
  }
}
