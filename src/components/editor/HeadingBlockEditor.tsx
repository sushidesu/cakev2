import React from "react"
import { HeadingBlock } from "../../domain/customBlock/block"
import { BlockEditorProps } from "./BlockEditor"
import { BlockEditorWrapper } from "./BlockEditorWrapper"

export function HeadingBlockEditor({
  block,
  update,
  ...rest
}: BlockEditorProps<HeadingBlock>): JSX.Element {
  return (
    <BlockEditorWrapper label={"見出し"} {...rest}>
      <input
        defaultValue={block.value.content}
        onBlur={e => {
          e.persist()
          update({
            id: block.id,
            mutation: prev => {
              return {
                id: prev.id,
                type: "heading",
                value: {
                  content: e.target.value,
                },
              }
            },
          })
        }}
      />
    </BlockEditorWrapper>
  )
}
