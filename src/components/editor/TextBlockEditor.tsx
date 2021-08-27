import React from "react"
import { TextBlock } from "../../domain/customBlock/block"
import { BlockEditorProps } from "./BlockEditor"
import { BlockEditorWrapper } from "./BlockEditorWrapper"
import { Textarea } from "../atom/Textarea"

export function TextBlockEditor({
  block,
  update,
  ...rest
}: BlockEditorProps<TextBlock>): JSX.Element {
  return (
    <BlockEditorWrapper label="文章" {...rest}>
      <Textarea
        placeholder="例: 肌にやさしい洗剤です。ふんわり仕上がります。"
        defaultValue={block.value.content}
        onBlur={(e) => {
          e.persist()
          update({
            id: block.id,
            mutation: (prev) => {
              if (prev.type === "text") {
                return {
                  ...prev,
                  type: "text",
                  value: {
                    content: e.target.value,
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
