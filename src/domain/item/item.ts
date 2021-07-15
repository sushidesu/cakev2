import { ItemId } from "./itemId"
import { Jancode } from "../jancode"

export interface ICreateItemEntityProps {
  name: string
  price: number
  weight: number
  stockRakuten: number
  stockMakeshop: number
  jancode: Jancode
}

export class ItemEntity {
  private constructor(
    public readonly id: ItemId,
    private props: ICreateItemEntityProps
  ) {}

  /* --- getter --- */
  public get name(): string {
    return this.props.name
  }
  public get price(): number {
    return this.props.price
  }
  public get weight(): number {
    return this.props.weight
  }
  public get stockRakuten(): number {
    return this.props.stockRakuten
  }
  public get stockMakeshop(): number {
    return this.props.stockMakeshop
  }
  public get jancode(): Jancode {
    return this.props.jancode
  }
  /* ------ */
}
