import { Storage_v3 } from "../scheme"
import { Storage_v2 } from "./interface/scheme"

export class SchemeV2Client {
  public constructor() {}

  public storageV2ToV3(storage: Storage_v2): Storage_v3 {
    storage.shopItems.map(item_v2 => item_v2)
    return {
      items: {}, // TODO
      selectedItemId: null,
    }
  }
}
