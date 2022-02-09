import { JSONFileClient } from "../json-file-client"
import { Item } from "../../../domain/item/item"
import { ItemId } from "../../../domain/item/itemId"
import { Jancode } from "../../../domain/jancode"
import { JSONScheme } from "../interface/scheme"

describe("JSONFileClient", () => {
  let jsonFileClient: JSONFileClient
  beforeEach(() => {
    jsonFileClient = new JSONFileClient()
  })

  describe("getItemsFromJSONFile()", () => {
    it("変換後の商品idは別のidになっている (cakev3)", () => {
      const json_v3 = {
        version: 3,
        items: {
          "test-item": {
            id: "test-item",
            name: "",
            price: 0,
            weight: 0,
            stockRakuten: 0,
            stockMakeshop: 0,
            jancodeString: "",
            blocks: [],
          },
        },
      }
      const actual = jsonFileClient.getItemsFromJSONFile(json_v3)
      expect(actual[0].id.value).not.toBe("test-item")
    })
    it("変換後の商品idは別のidになっている (cakev2)", () => {
      const json_v2 = {
        cakev2: {
          nowItemIndex: null,
          shopItems: [
            {
              descriptions: [],
              details: [],
              id: 100,
              imageURL: "",
              jancode: "",
              name: "",
              price: "0",
              stockMakeshop: "0",
              stockRakuten: "0",
              weight: "0",
            },
          ],
        },
      }
      const actual = jsonFileClient.getItemsFromJSONFile(json_v2)
      expect(actual[0].id.value).not.toBe("100")
    })
    it("cakev3のデータを渡すとitemに変換する", () => {
      const json_v3 = {
        version: 3,
        items: {
          "test-item": {
            id: "test-item",
            name: "テスト商品",
            price: 5000,
            weight: 10,
            stockRakuten: 5,
            stockMakeshop: 6,
            jancodeString: "1234567890123",
            blocks: [],
          },
        },
      }
      const actual = jsonFileClient.getItemsFromJSONFile(json_v3)
      const expected: Item[] = [
        {
          id: expect.any(ItemId),
          name: "テスト商品",
          price: 5000,
          weight: 10,
          stockRakuten: 5,
          stockMakeshop: 6,
          jancode: Jancode.reconstruct("1234567890123"),
          blocks: [],
          subBlocks: [],
        },
      ]
      expect(expected).toStrictEqual(actual)
    })
    it("cakev2のデータを渡すとitemに変換する", () => {
      const json_v2 = {
        cakev2: {
          nowItemIndex: 26,
          shopItems: [
            {
              descriptions: [],
              details: [],
              id: 22,
              imageURL: "",
              jancode: "4560294809704",
              name: "カナヤブラシ・ボディーブラシ（豚毛白）",
              price: "3985",
              stockMakeshop: "1",
              stockRakuten: "0",
              weight: "95",
            },
          ],
        },
      }
      const actual = jsonFileClient.getItemsFromJSONFile(json_v2)
      const expected: Item[] = [
        {
          id: expect.any(ItemId),
          name: "カナヤブラシ・ボディーブラシ（豚毛白）",
          price: 3985,
          weight: 95,
          stockRakuten: 0,
          stockMakeshop: 1,
          jancode: Jancode.reconstruct("4560294809704"),
          blocks: [],
          subBlocks: [],
        },
      ]
      expect(actual).toStrictEqual(expected)
    })
    it("対応していないデータを渡すとエラーを発生させる", () => {
      const invalid = {
        items: "heyheyhey",
      }
      expect(() => jsonFileClient.getItemsFromJSONFile(invalid)).toThrowError()
    })
  })
  describe("exportItemsAsJSONFile()", () => {
    it("itemをJSONSchemeに変換する", () => {
      const items: Item[] = [
        {
          id: ItemId.reconstruct("test-item"),
          name: "テスト商品",
          price: 1000,
          weight: 100,
          stockRakuten: 5,
          stockMakeshop: 6,
          jancode: Jancode.reconstruct("1234567890123"),
          blocks: [],
          subBlocks: [],
        },
      ]
      const actual = jsonFileClient.exportItemsAsJSONFile(items)
      const expected: JSONScheme = {
        version: 3,
        items: {
          "test-item": {
            id: "test-item",
            name: "テスト商品",
            price: 1000,
            weight: 100,
            stockRakuten: 5,
            stockMakeshop: 6,
            jancodeString: "1234567890123",
            blocks: [],
            order: 0,
          },
        },
      }
      expect(actual).toStrictEqual(expected)
    })
  })
})
