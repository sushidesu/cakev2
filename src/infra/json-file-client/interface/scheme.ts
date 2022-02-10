import { Storage_v2 } from "../../scheme-v2-client/interface/scheme"
import { BlockValue } from "../../scheme"

export type JSONScheme = {
  version: number
  items: {
    [id: string]: ItemJSON
  }
}

export type ItemJSON = {
  id: string
  name: string
  price: number
  weight: number
  stockRakuten: number
  stockMakeshop: number
  jancodeString: string
  blocks: BlockValue[]
  subBlocks?: BlockValue[]
  order: number
}
export type BlockJSON = BlockValue

export type JSONScheme_V2 = {
  cakev2: Storage_v2
}
