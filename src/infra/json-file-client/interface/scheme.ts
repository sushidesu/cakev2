import { Storage_v2 } from "../../scheme-v2-client/interface/scheme"
import { ItemValue, BlockValue } from "../../scheme"

export type JSONScheme = {
  version: number
  items: {
    [id: string]: ItemJSON
  }
}

export type ItemJSON = ItemValue
export type BlockJSON = BlockValue

export type JSONScheme_V2 = {
  cakev2: Storage_v2
}
