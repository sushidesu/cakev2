import React from "react"
import { HeadingBlock } from "../../domain/customBlock/block"
import { BlockEditorProps } from "./BlockEditor"
import { BlockEditorWrapper } from "./BlockEditorWrapper"
import { Input } from "../atom/Input"

export function HeadingBlockEditor({
  block,
  update,
  ...rest
}: BlockEditorProps<HeadingBlock>): JSX.Element {
  return (
    <BlockEditorWrapper label={"見出し"} {...rest}>
      <Input
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
