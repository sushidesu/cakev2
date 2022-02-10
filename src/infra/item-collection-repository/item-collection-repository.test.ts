import { mock } from "jest-mock-extended"
import { ChromeStorageClient } from "../chrome-storage-client/chrome-storage-client"
import { ItemCollectionRepository } from "./item-collection-repository"
import { Storage_v2 } from "../scheme-v2-client/interface/scheme"
import { ItemValue, Storage_v3 } from "../scheme"

describe(`ItemCollectionRepository`, () => {
  // mock
  const chromeStorageClientMocked = mock<ChromeStorageClient>()

  let itemCollectionRepository: ItemCollectionRepository
  beforeEach(() => {
    itemCollectionRepository = new ItemCollectionRepository(
      chromeStorageClientMocked
    )
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  describe(`migrate()`, () => {
    it(`storage_v3を取得できる場合、何もしない`, async () => {
      // V3が取得できる
      chromeStorageClientMocked.storageV3LocalGet.mockResolvedValue({
        items: {},
        selectedItemId: "",
      })
      // act
      await itemCollectionRepository.migrate()
      // local storageが更新されていないことを確認
      expect(chromeStorageClientMocked.storageV3LocalSet).not.toBeCalled()
    })

    it(`storage_v3がなく、storage_v2がある場合、変換してSetする`, async () => {
      // V3が無い
      chromeStorageClientMocked.storageV3LocalGet.mockResolvedValue(undefined)
      // V2がある
      const v2: Storage_v2 = {
        shopItems: [
          {
            id: 0,
            name: "test",
            descriptions: [],
            details: [],
            price: "100",
            stockMakeshop: "0",
            stockRakuten: "0",
            imageURL: "",
            jancode: "",
            weight: "",
          },
        ],
        nowItemIndex: 0,
      }
      chromeStorageClientMocked.storageV2LocalGet.mockResolvedValue(v2)
      // act
      await itemCollectionRepository.migrate()

      // setされている
      expect(chromeStorageClientMocked.storageV3LocalSet).toBeCalled()
    })

    it(`storage_v3, storage_v2ともにない場合、空のデータをsetする`, async () => {
      // V3が無い
      chromeStorageClientMocked.storageV3LocalGet.mockResolvedValue(undefined)
      // V2も無い
      chromeStorageClientMocked.storageV2LocalGet.mockResolvedValue(undefined)

      // act
      await itemCollectionRepository.migrate()

      // 空のデータがsetされる
      const empty: Storage_v3 = {
        selectedItemId: null,
        items: {},
      }
      expect(chromeStorageClientMocked.storageV3LocalSet).toBeCalledWith(empty)
    })
  })

  it(`サブ商品説明文が無いitemに、空のサブ商品説明文を追加する`, async () => {
    const validItem: ItemValue = {
      id: "valid-item-01",
      name: "valid-item-01",
      blocks: [],
      subBlocks: [
        {
          id: "block01",
          type: "test",
          value: "test-block",
        },
      ],
      jancodeString: "",
      order: 0,
      price: 0,
      weight: 0,
      stockRakuten: 0,
      stockMakeshop: 0,
    }
    const invalidItem = {
      id: "invalid-item-01",
      name: "invalid-item-01",
      blocks: [],
      // subBlocks: [] subBlockが無い!
      jancodeString: "",
      order: 0,
      price: 0,
      weight: 0,
      stockRakuten: 0,
      stockMakeshop: 0,
    } as unknown as ItemValue

    // subBlocksプロパティを持たないitemが存在する
    const v3: Storage_v3 = {
      selectedItemId: null,
      items: {
        ["valid-item-01"]: validItem,
        ["invalid-item-01"]: invalidItem,
      },
    }
    chromeStorageClientMocked.storageV3LocalGet.mockResolvedValue(v3)

    // act
    await itemCollectionRepository.migrate()

    // 不正なitemのみ、subBlockが空で初期化される
    const expectedProp: Storage_v3 = {
      selectedItemId: null,
      items: {
        ["valid-item-01"]: validItem,
        ["invalid-item-01"]: {
          ...invalidItem,
          subBlocks: [],
        },
      },
    }
    expect(chromeStorageClientMocked.storageV3LocalSet).toBeCalledWith(
      expectedProp
    )
  })
})
