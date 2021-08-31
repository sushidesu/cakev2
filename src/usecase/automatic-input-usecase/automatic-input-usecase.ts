import { Item } from "../../domain/item/item"
import { IAutomaticInputClient } from "./interface/automatic-input-client"

export interface AutomaticInputUsecaseProps {
  item: Item
  info: boolean
  stock: boolean
  descriptions: boolean
}

export class AutomaticInputUsecase {
  constructor(private automaticInputClient: IAutomaticInputClient) {}

  exec({ item, info, stock, descriptions }: AutomaticInputUsecaseProps): void {
    this.automaticInputClient.beforeInput()
    if (info) {
      this.automaticInputClient.inputInfo(item)
    }
    if (stock) {
      this.automaticInputClient.inputStock(item)
    }
    if (descriptions) {
      this.automaticInputClient.inputDescriptions(item)
    }
  }
}
