import { HeadingBlock, ImageBlock, TableBlock, TextBlock } from "./block"
import { isNotNullish } from "../../utils/isNotNullish"

export const isHeadingBlockValue = (
  value: unknown
): value is HeadingBlock["value"] => {
  if (!isNotNullish(value)) {
    return false
  }
  return typeof value.content === "string"
}

export const isTextBlockValue = (
  value: unknown
): value is TextBlock["value"] => {
  if (!isNotNullish(value)) {
    return false
  }
  return typeof value.content === "string"
}

export const isImageBlockValue = (
  value: unknown
): value is ImageBlock["value"] => {
  if (!isNotNullish(value)) {
    return false
  }
  return typeof value.imageUrl === "string"
}

export const isTableBlockValue = (
  value: unknown
): value is TableBlock["value"] => {
  if (!isNotNullish(value)) {
    return false
  }
  return Array.isArray(value.rows)
}
