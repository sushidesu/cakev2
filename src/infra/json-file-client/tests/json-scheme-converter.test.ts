import { BlockId } from "../../../domain/block/blockId"
import { Item } from "../../../domain/item/item"
import { ItemId } from "../../../domain/item/itemId"
import { JSONShcemeConverter } from "../json-scheme-converter"

describe(`JSONSchemeConverter`, () => {
  let converter: JSONShcemeConverter

  beforeEach(() => {
    converter = new JSONShcemeConverter()
  })

  describe(`entityToJSON()`, () => {
    it(`block,subBlockを正しく変換する`, () => {
      const item: Item = {
        id: ItemId.reconstruct("item-01"),
        name: "テスト商品",
        price: 0,
        weight: 0,
        stockRakuten: 0,
        stockMakeshop: 0,
        jancode: undefined,
        blocks: [
          {
            id: BlockId.reconstruct("block-01"),
            type: "text",
            value: {
              content: "hello",
            },
          },
        ],
        subBlocks: [
          {
            id: BlockId.reconstruct("sub-01"),
            type: "heading",
            value: {
              content: "HELLO",
            },
          },
        ],
      }
      const actual = converter.entityToJSON(item, 0)
      expect(actual).toStrictEqual({
        id: "item-01",
        name: "テスト商品",
        price: 0,
        weight: 0,
        stockRakuten: 0,
        stockMakeshop: 0,
        jancodeString: "",
        blocks: [
          {
            id: "block-01",
            type: "text",
            value: {
              content: "hello",
            },
          },
        ],
        subBlocks: [
          {
            id: "sub-01",
            type: "heading",
            value: {
              content: "HELLO",
            },
          },
        ],
        order: 0,
      })
    })
  })
})
