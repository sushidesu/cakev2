import { mock } from "jest-mock-extended"
import { ChromeStorageClient } from "../chrome-storage-client/chrome-storage-client"
import { ItemCollectionRepository } from "./item-collection-repository"
import { Storage_v2 } from "../scheme-v2-client/interface/scheme"

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
  })
})
