import { v4 as uuidv4 } from "uuid"
import { Storage_v3, ItemValue, BlockValue } from "../scheme"
import { Storage_v2, IShopItemV2 } from "./interface/scheme"
import { stringToNumber } from "../../utils/stringToNumber"

export class SchemeV2Client {
  public convertStorageV2ToV3(storage_v2: Storage_v2): Storage_v3 {
    const itemsConverted = Object.fromEntries(
      storage_v2.shopItems.map((item, index) => {
        const id = uuidv4()
        return [id, this.convertV2toV3(id, index, item)]
      })
    )
    const keys = Object.keys(itemsConverted)
    const firstItemId = keys.length ? keys[0] : null

    return {
      selectedItemId: firstItemId,
      items: itemsConverted,
    }
  }

  private convertV2toV3(
    id: string,
    index: number,
    item: IShopItemV2
  ): ItemValue {
    const { descriptions, details, imageURL } = item
    const imageBlock: BlockValue[] = imageURL
      ? [
          {
            id: uuidv4(),
            type: "image",
            value: {
              imageUrl: imageURL,
            },
          },
        ]
      : []
    const textBlocks: BlockValue[] = descriptions.flatMap<BlockValue>(
      (desc) => {
        return [
          {
            id: uuidv4(),
            type: "heading",
            value: {
              content: desc.title,
            },
          },
          {
            id: uuidv4(),
            type: "text",
            value: {
              content: desc.body,
            },
          },
        ]
      }
    )
    const tableBlock: BlockValue[] = details.length
      ? [
          {
            id: uuidv4(),
            type: "table",
            value: {
              rows: details.map((detail) => {
                return {
                  title: detail.title,
                  body: detail.body,
                }
              }),
            },
          },
        ]
      : []
    const blocks: BlockValue[] = [...imageBlock, ...textBlocks, ...tableBlock]

    return {
      id,
      name: item.name,
      price: stringToNumber(item.price),
      weight: stringToNumber(item.weight),
      stockRakuten: stringToNumber(item.stockRakuten),
      stockMakeshop: stringToNumber(item.stockMakeshop),
      jancodeString: item.jancode,
      blocks,
      order: index,
    }
  }
}
