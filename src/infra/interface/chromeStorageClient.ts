import { Storage_v3 } from "../scheme"
import { Storage_v2 } from "../scheme-v2-client/interface/scheme"

export interface IChromeStorageClient {
  storageV2LocalGet(): Promise<undefined | Storage_v2>
  storageV3LocalGet(): Promise<undefined | Storage_v3>
  storageV3LocalSet(value: Storage_v3): Promise<void>
}
