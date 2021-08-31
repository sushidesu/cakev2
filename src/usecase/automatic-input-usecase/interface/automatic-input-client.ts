import { Item } from "../../../domain/item/item"

export interface IAutomaticInputClient {
  inputDescriptions(item: Item): void
  inputStock(item: Item): void
  inputInfo(item: Item): void
}
