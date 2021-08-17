import { Item } from "../domain/item/item"
import { CustomBlock } from "../domain/customBlock/block"
import { JsonClientInterface } from "../usecase/interface/json-client-interface"
import { YYYY_MM_DD_HHmmss } from "../plugins/date"

export class JSONFileClient implements JsonClientInterface {
  public getItemsFromJSONFile(): Item[] {
    // TODO
    console.log("IMPORT FILE")
    return []
  }

  public exportItemsAsJSONFile(items: Item[]): void {
    console.log("EXPORT FILE", { items })
    console.log(JSONFileClient.entityToJSON(items[0]))

    const value: JSONScheme = {
      version: 3,
      items: Object.fromEntries(
        items
          .map(item => JSONFileClient.entityToJSON(item))
          .map(item => [item.id, item])
      ),
    }
    const encoded = encodeURIComponent(JSON.stringify(value))
    const url = `data:text/json;charset=utf-8,${encoded}`
    const date = YYYY_MM_DD_HHmmss()
    const fileName = `item-list-${date}.json`

    chrome.downloads.download({
      url,
      filename: fileName,
    })
  }

  private static entityToJSON(entity: Item): ItemJSON {
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

  private static blockToJSON(block: CustomBlock): BlockJSON {
    console.log("block to json")
    return {
      id: block.id.value,
      type: block.type,
      value: block.value,
    }
  }
}

type JSONScheme = {
  version: number
  items: {
    [id: string]: ItemJSON
  }
}

type ItemJSON = {
  id: string
  name: string
  price: number
  weight: number
  stockRakuten: number
  stockMakeshop: number
  jancode: string
  blocks: BlockJSON[]
}

type BlockJSON = {
  id: string
  type: string
  value: any
}
