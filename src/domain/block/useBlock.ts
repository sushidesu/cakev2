import { useCallback, useState } from "react"
import { removeElementFromArray } from "../../utils/removeElementFromArray"
import { moveElementRelative } from "../../utils/moveElementRelative"

// --- interface ---
export interface BlockBase<T, U extends string> {
  id: string
  type: U
  value: T
}

// main interface
export interface BlockCollection<Block extends BlockBase<any, any>> {
  blocks: ReadonlyArray<Block>
  addBlock: (props: AddBlockProps<Block>) => void
  removeBlock: (props: RemoveBlockProps) => void
  moveBlock: (props: MoveBlockProps) => void
  updateBlock: (props: UpdateBlockProps<Block>) => void
  handleSubmit: HandleBlockSubmit<Block>
}

// helpers
export type BlockInitializer<Block extends BlockBase<any, any>> = (
  type: Block["type"]
) => Block

export interface UseBlockCollectionProps<Block extends BlockBase<any, any>> {
  blockInitializer: BlockInitializer<Block>
  initialBlocks?: Block[]
}

type AddBlockProps<Block extends BlockBase<any, any>> = {
  type: Block["type"]
}
type RemoveBlockProps = {
  id: string
}
type MoveBlockProps = {
  id: string
  type: "relative"
  offset: number
}
type HandleBlockSubmit<Block extends BlockBase<any, any>> = (
  func: (blocks: Block[]) => void
) => () => void

// update helper
export type UpdateBlockProps<Block extends BlockBase<any, any>> = {
  id: string
  mutation: (prev: Block) => Block
}
export type UpdateBlockFunction<Block extends BlockBase<any, any>> = (
  props: UpdateBlockProps<Block>
) => void

// --- implements ---
// helper
const findTargetBlockIndex = <Block extends BlockBase<any, any>>(
  id: Block["id"],
  blocks: Block[]
): number => {
  const targetIndex = blocks.findIndex(block => block.id === id)
  if (targetIndex === -1) {
    throw Error("cannot find id")
  }
  return targetIndex
}

// main
export const useBlockCollection = <Block extends BlockBase<any, any>>({
  blockInitializer,
  initialBlocks,
}: UseBlockCollectionProps<Block>): BlockCollection<Block> => {
  const [blocks, setBlocks] = useState<Block[]>(initialBlocks ?? [])

  const addBlock = useCallback(
    ({ type }: AddBlockProps<Block>) => {
      setBlocks(prev => {
        const newBlock = blockInitializer(type)
        return prev.concat(newBlock)
      })
    },
    [blockInitializer]
  )

  const removeBlock = useCallback(({ id }: RemoveBlockProps) => {
    setBlocks(prev => {
      const targetIndex = findTargetBlockIndex(id, prev)
      return removeElementFromArray(prev, targetIndex)
    })
  }, [])

  const moveBlock = useCallback(({ id, offset }: MoveBlockProps) => {
    setBlocks(prev => {
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
      setBlocks(prev => {
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
    func => {
      return () => {
        func(blocks)
      }
    },
    [blocks]
  )

  return {
    blocks,
    addBlock,
    removeBlock,
    moveBlock,
    updateBlock,
    handleSubmit,
  }
}
