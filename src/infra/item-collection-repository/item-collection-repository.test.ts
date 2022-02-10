import { mock } from "jest-mock-extended"
import { ChromeStorageClient } from "../chrome-storage-client/chrome-storage-client"
import { ItemCollectionRepository } from "./item-collection-repository"

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
  })
})
