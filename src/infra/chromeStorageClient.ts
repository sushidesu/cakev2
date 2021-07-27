import { v4 as uuidv4 } from "uuid"
import { Storage_v2, KEY_VERSION_2, Storage_v3, KEY_VERSION_3 } from "./scheme"

export class ChromeStorageClient {
  public migrate(entireStorage: { [key: string]: any }): Promise<void> {
    return new Promise<void>(resolve => {
      if (Reflect.has(entireStorage, KEY_VERSION_3)) {
        // migrateの必要なし
        console.log("cakev3 is already exist")
        resolve()
        return
      }

      if (Reflect.has(entireStorage, KEY_VERSION_2)) {
        const values = entireStorage[KEY_VERSION_2] as Storage_v2
        const items = Object.fromEntries(
          values.shopItems.map(item => {
            return [uuidv4(), item]
          })
        )
        const newValues: Storage_v3 = {
          items,
        }
        chrome.storage.local.set(
          {
            [KEY_VERSION_3]: newValues,
          },
          () => {
            resolve()
          }
        )
      }
    })
  }
}
