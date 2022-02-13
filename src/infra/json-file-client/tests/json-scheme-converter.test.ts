import { BlockId } from "../../../domain/block/blockId"
import { Item } from "../../../domain/item/item"
import { ItemId } from "../../../domain/item/itemId"
import { ItemJSON } from "../interface/scheme"
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

  describe(`JSON_V3ToEntity()`, () => {
    it(`block,subBlockを正しく変換する`, () => {
      const json: ItemJSON = {
        id: "item-01",
        name: "テスト商品",
        price: 0,
        weight: 0,
        order: 0,
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
              content: "HELLO!",
            },
          },
        ],
      }
      const actual = converter.JSON_V3ToEntity(json)
      const expected: Item = {
        // IDは常に新規生成する
        id: expect.any(ItemId),
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
              content: "HELLO!",
            },
          },
        ],
      }
      expect(actual).toStrictEqual(expected)
    })
    it(`空のsubBlockは[]で初期化する`, () => {
      const json: ItemJSON = {
        id: "item-01",
        name: "テスト商品",
        price: 0,
        weight: 0,
        stockRakuten: 0,
        stockMakeshop: 0,
        order: 0,
        jancodeString: "",
        blocks: [],
      }
      const expected: Item = {
        id: expect.any(ItemId),
        name: "テスト商品",
        price: 0,
        weight: 0,
        stockRakuten: 0,
        stockMakeshop: 0,
        jancode: undefined,
        blocks: [],
        subBlocks: [],
      }
      const actual = converter.JSON_V3ToEntity(json)
      expect(actual).toStrictEqual(expected)
    })
  })
})
