import { useCallback, useState } from "react"
import { BlockId } from "./blockId"
import { removeElementFromArray } from "../../utils/removeElementFromArray"
import { moveElementRelative } from "../../utils/moveElementRelative"

// --- interface ---
export interface BlockBase<T, U extends string> {
  id: BlockId
  type: U
  value: T
}

// main interface
export interface BlockCollection<Block extends BlockBase<unknown, string>> {
  blocks: ReadonlyArray<Block>
  addBlock: (props: AddBlockProps<Block>) => void
  removeBlock: (props: RemoveBlockProps) => void
  moveBlock: (props: MoveBlockProps) => void
  updateBlock: (props: UpdateBlockProps<Block>) => void
  handleSubmit: HandleBlockSubmit<Block>
  initBlocks: (blocks: readonly Block[]) => void
}

// helpers
export type BlockInitializer<Block extends BlockBase<unknown, string>> = (
  type: Block["type"]
) => Block

export interface UseBlockCollectionProps<
  Block extends BlockBase<unknown, string>
> {
  blockInitializer: BlockInitializer<Block>
  initialBlocks?: Block[]
}

type AddBlockProps<Block extends BlockBase<unknown, string>> = {
  type: Block["type"]
}
type RemoveBlockProps = {
  id: BlockId
}
type MoveBlockProps = {
  id: BlockId
  type: "relative"
  offset: number
}
type HandleBlockSubmit<Block extends BlockBase<unknown, string>> = (
  func: (blocks: Block[]) => void
) => () => void

// update helper
type UpdateBlockProps<Block extends BlockBase<unknown, string>> = {
  id: BlockId
  mutation: (prev: Block) => Block
}

// --- implements ---
// helper
const findTargetBlockIndex = <Block extends BlockBase<unknown, string>>(
  id: Block["id"],
  blocks: Block[]
): number => {
  const targetIndex = blocks.findIndex((block) => block.id.equals(id))
  if (targetIndex === -1) {
    throw Error("cannot find id")
  }
  return targetIndex
}

// main
export const useBlockCollection = <Block extends BlockBase<unknown, string>>({
  blockInitializer,
  initialBlocks,
}: UseBlockCollectionProps<Block>): BlockCollection<Block> => {
  const [blocks, setBlocks] = useState<Block[]>(initialBlocks ?? [])

  const addBlock = useCallback(
    ({ type }: AddBlockProps<Block>) => {
      setBlocks((prev) => {
        const newBlock = blockInitializer(type)
        return prev.concat(newBlock)
      })
    },
    [blockInitializer]
  )

  const removeBlock = useCallback(({ id }: RemoveBlockProps) => {
    setBlocks((prev) => {
      const targetIndex = findTargetBlockIndex(id, prev)
      return removeElementFromArray(prev, targetIndex)
    })
  }, [])

  const moveBlock = useCallback(({ id, offset }: MoveBlockProps) => {
    setBlocks((prev) => {
      if (offset === 0) {
        return prev
      }
      const targetIndex = findTargetBlockIndex(id, prev)
      const newBlocks = [...prev]
      return moveElementRelative(newBlocks, targetIndex, offset)
    })
  }, [])

  const updateBlock = useCallback(
    ({ id, mutation }: UpdateBlockProps<Block>) => {
      setBlocks((prev) => {
        const targetIndex = findTargetBlockIndex(id, prev)
        const target = prev[targetIndex]
        const newBlock = mutation(target)
        const next = [...prev]
        next[targetIndex] = newBlock
        return next
      })
    },
    []
  )

  const handleSubmit: HandleBlockSubmit<Block> = useCallback(
    (func) => {
      return () => {
        func(blocks)
      }
    },
    [blocks]
  )

  const initBlocks = useCallback((blocks: readonly Block[]) => {
    console.info(blocks)
    setBlocks([...blocks])
  }, [])
  console.log("blocks", blocks)

  return {
    blocks,
    addBlock,
    removeBlock,
    moveBlock,
    updateBlock,
    handleSubmit,
    initBlocks,
  }
}
