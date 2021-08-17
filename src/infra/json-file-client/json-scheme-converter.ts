import { Item } from "../../domain/item/item"
import { CustomBlock } from "../../domain/customBlock/block"

import { ItemJSON, BlockJSON } from "./interface/scheme"

export class JSONShcemeConverter {
  public entityToJSON(entity: Item): ItemJSON {
    return {
      id: entity.id.value,
      name: entity.name,
      price: entity.price,
      weight: entity.weight,
      stockRakuten: entity.stockRakuten,
      stockMakeshop: entity.stockMakeshop,
      jancode: entity.jancode?.toString() ?? "",
      blocks: entity.blocks.map(this.blockToJSON),
    }
  }

  public blockToJSON(block: CustomBlock): BlockJSON {
    return {
      id: block.id.value,
      type: block.type,
      value: block.value,
    }
  }
}
