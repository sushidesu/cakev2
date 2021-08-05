import { Storage_v2, Storage_v3 } from "../scheme"

export interface IChromeStorageClient {
  storageV2LocalGet(): Promise<undefined | Storage_v2>
  storageV3LocalGet(): Promise<undefined | Storage_v3>
  storageV3LocalSet(value: Storage_v3): Promise<void>
  convertStorageV2ToV3(storage_v2: Storage_v2): Storage_v3
}
