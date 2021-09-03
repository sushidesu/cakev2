import { mocked } from "ts-jest/utils"
import { FileIOClient } from "../file-io-client"

describe("FileIOClient", () => {
  let fileIOClient: FileIOClient
  beforeEach(() => {
    fileIOClient = new FileIOClient()
  })
  describe("load()", () => {
    // FIXME: テストが書けません
  })
  describe("export()", () => {
    beforeEach(() => {
      global.chrome = {
        // @ts-expect-error for simply
        downloads: {
          download: jest.fn().mockReturnValue("test"),
        },
      }
    })
    it("chrome.downloads.download()が1回実行される", () => {
      const downloadFunctionMock = mocked(global.chrome.downloads.download)
      fileIOClient.export({})
      expect(downloadFunctionMock).toBeCalledTimes(1)
    })
  })
})
