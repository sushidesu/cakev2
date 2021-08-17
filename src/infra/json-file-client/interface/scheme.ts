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
  jancode: string
  blocks: BlockJSON[]
}

export type BlockJSON = {
  id: string
  type: string
  value: any
}

export type JSONScheme_V2 = {
  cakev2: {
    shopItems: ItemJSON_V2[]
    nowItemIndex: number
  }
}

export type ItemJSON_V2 = {
  id: number
  name: string
  price: string
  weight: string
  stockRakuten: string
  stockMakeshop: string
  jancode: string
  imageURL: string
  descriptions: ItemText[]
  details: ItemText[]
}

export type ItemText = {
  index: number
  title: string
  body: string
}
