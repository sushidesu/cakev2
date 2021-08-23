import { CustomBlock } from "./block"
import { useBlockCollection, BlockCollection } from "../block/useBlock"
import { BlockId } from "../block/blockId"

export type CustomBlockCollection = BlockCollection<CustomBlock>

export const useCustomBlock = (): CustomBlockCollection => {
  return useBlockCollection<CustomBlock>({
    blockInitializer: type => {
      const id = BlockId.create()
      switch (type) {
        case "heading":
          return {
            id,
            type: "heading",
            value: {
              content: "",
            },
          }
        case "text":
          return {
            id,
            type: "text",
            value: {
              content: "",
            },
          }
        case "image":
          return {
            id,
            type: "image",
            value: {
              imageUrl: "",
            },
          }
        case "table":
          return {
            id,
            type: "table",
            value: {
              rows: [
                {
                  title: "",
                  body: "",
                },
              ],
            },
          }
        default:
          throw Error("invalid type")
      }
    },
  })
}
