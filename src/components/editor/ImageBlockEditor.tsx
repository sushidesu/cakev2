import React from "react"
import styled from "styled-components"
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
      <div className="media">
        <div className="media-left">
          <Thumbnail src={block.value.imageUrl} />
        </div>
        <div className="media-content">
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
        </div>
      </div>
    </BlockEditorWrapper>
  )
}

const Figure = styled.figure`
  img {
    position: relative;
    object-fit: contain;
    width: 128px;
    height: 128px;
    background-color: #fff;
    box-shadow: 2px 4px 6px rgba(200, 200, 200, 0.4);
  }
`

const NoImage = styled.div`
  position: relative;
  width: 128px;
  height: 128px;
  text-align: center;
  user-select: none;
  &:before {
    content: "No Image";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`

const Thumbnail = ({ src }: { src: string }): JSX.Element => (
  <Figure className={"image is-128x128"}>
    {src ? (
      <img src={src} />
    ) : (
      <NoImage className="has-background-light has-text-grey" />
    )}
  </Figure>
)
