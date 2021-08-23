import { Item } from "../../domain/item/item"
import { ItemId } from "../../domain/item/itemId"
import { Jancode } from "../../domain/jancode"
import { CustomBlock } from "../../domain/customBlock/block"
import { BlockId } from "../../domain/block/blockId"
import { ItemJSON, BlockJSON } from "./interface/scheme"

export class JSONShcemeConverter {
  public entityToJSON(entity: Item, index: number): ItemJSON {
    return {
      id: entity.id.value,
      name: entity.name,
      price: entity.price,
      weight: entity.weight,
      stockRakuten: entity.stockRakuten,
      stockMakeshop: entity.stockMakeshop,
      jancodeString: entity.jancode?.toString() ?? "",
      blocks: entity.blocks.map(this.blockToJSON),
      order: index,
    }
  }

  public blockToJSON(block: CustomBlock): BlockJSON {
    return {
      id: block.id.value,
      type: block.type,
      value: block.value,
    }
  }

  public JSON_V3ToEntity(json: ItemJSON): Item {
    return {
      id: ItemId.reconstruct(json.id),
      name: json.name,
      price: json.price,
      weight: json.weight,
      stockRakuten: json.stockRakuten,
      stockMakeshop: json.stockMakeshop,
      jancode: Jancode.reconstruct(json.jancodeString),
      blocks: json.blocks.map(blockJson => this.JSON_V3ToBlock(blockJson)),
    }
  }

  public JSON_V3ToBlock(json: BlockJSON): CustomBlock {
    const id = BlockId.reconstruct(json.id)
    switch (json.type) {
      case "heading":
      case "text":
      case "image":
      case "table":
        return {
          id,
          type: json.type,
          value: json.value,
        }
      default:
        throw Error(`invalid block type ${json.type}`)
    }
  }
}
