import React from "react"
import { ImageBlock } from "../../domain/customBlock/block"
import { BlockEditorProps } from "./BlockEditor"
import { BlockEditorWrapper } from "./BlockEditorWrapper"
import { Input } from "../atom/Input"

export function ImageBlockEditor({
  block,
  update,
  ...rest
}: BlockEditorProps<ImageBlock>): JSX.Element {
  return (
    <BlockEditorWrapper label={"画像"} {...rest}>
      <Input
        defaultValue={block.value.imageUrl}
        onBlur={e => {
          e.persist()
          update({
            id: block.id,
            mutation: prev => {
              if (prev.type === "image") {
                return {
                  ...prev,
                  type: "image",
                  value: {
                    ...prev.value,
                    imageUrl: e.target.value,
                  },
                }
              } else {
                return prev
              }
            },
          })
        }}
      />
    </BlockEditorWrapper>
  )
}
