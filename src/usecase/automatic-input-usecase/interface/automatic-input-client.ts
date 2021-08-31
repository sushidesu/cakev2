import { Item } from "../../../domain/item/item"

export interface IAutomaticInputClient {
  beforeInput(): void
  inputDescriptions(item: Item): void
  inputStock(item: Item): void
  inputInfo(item: Item): void
}
