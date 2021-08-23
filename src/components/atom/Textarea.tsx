import React, { forwardRef, ForwardRefRenderFunction } from "react"

export type Props = Omit<JSX.IntrinsicElements["textarea"], "ref" | "className">

const TextareaWithOutRef: ForwardRefRenderFunction<
  HTMLTextAreaElement,
  Props
> = (props, ref) => {
  return <textarea {...props} className={"textarea"} ref={ref} />
}

export const Textarea = forwardRef(TextareaWithOutRef)
