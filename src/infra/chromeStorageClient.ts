import { IChromeStorageClient } from "./interface/chromeStorageClient"
import { Storage_v3, KEY_VERSION_2, KEY_VERSION_3 } from "./scheme"
import { Storage_v2 } from "./scheme-v2-client/interface/scheme"

export class ChromeStorageClient implements IChromeStorageClient {
  async storageV2LocalGet(): Promise<undefined | Storage_v2> {
    return new Promise((resolve) => {
      chrome.storage.local.get(KEY_VERSION_2, (storage) => {
        if (!Reflect.has(storage, KEY_VERSION_2)) {
          resolve(undefined)
        } else {
          resolve(storage[KEY_VERSION_2])
        }
      })
    })
  }
  async storageV3LocalGet(): Promise<undefined | Storage_v3> {
    return new Promise((resolve) => {
      chrome.storage.local.get(KEY_VERSION_3, (storage) => {
        if (!Reflect.has(storage, KEY_VERSION_3)) {
          resolve(undefined)
        } else {
          resolve(storage[KEY_VERSION_3])
        }
      })
    })
  }
  async storageV3LocalSet(value: Storage_v3): Promise<void> {
    return new Promise<void>((resolve) => {
      chrome.storage.local.set(
        {
          [KEY_VERSION_3]: value,
        },
        () => {
          resolve()
        }
      )
    })
  }
}
