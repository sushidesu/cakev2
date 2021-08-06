import React from "react"
import { TextBlock } from "../../domain/customBlock/block"
import { BlockEditorProps } from "./BlockEditor"
import { BlockEditorWrapper } from "./BlockEditorWrapper"

export function TextBlockEditor({
  block,
  update,
  ...rest
}: BlockEditorProps<TextBlock>): JSX.Element {
  return (
    <BlockEditorWrapper label="文章" {...rest}>
      <input
        defaultValue={block.value.content}
        onBlur={e => {
          e.persist()
          update({
            id: block.id,
            mutation: prev => {
              if (prev.type === "text") {
                return {
                  ...prev,
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
