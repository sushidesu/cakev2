import { Block, BlockTypes } from "../block"
import { BlockId } from "../blockId"

export interface INewTableBlockProps {}

export class ImageBlock implements Block {
  readonly type: BlockTypes = "image"
  public constructor(
    public readonly id: BlockId,
    private props: INewImageBlockProps
  ) {}

  public get imageUrl(): string {
    return this.props.imageUrl
  }
}
