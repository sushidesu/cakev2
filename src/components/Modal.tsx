import React from "react"
import clsx from "clsx"
import { CloseButton } from "./CloseButton"

export type Props = {
  show: boolean
  title: string
  onClickClose?: () => void
  onClickBackground?: () => void
  children?: React.ReactNode
  footer?: React.ReactNode
}

export function Modal({
  show,
  title,
  onClickClose,
  onClickBackground,
  children,
  footer,
}: Props): JSX.Element {
  return (
    <div className={clsx("modal", show && "is-active")}>
      <div className={clsx("modal-background")} onClick={onClickBackground} />
      <div className={clsx("modal-card")}>
        <header className={clsx("modal-card-head")}>
          <p className={clsx("modal-card-title")}>{title}</p>
          <CloseButton onClick={onClickClose} />
        </header>
        <section className={clsx("modal-card-body")}>{children}</section>
        <footer className={clsx("modal-card-foot")}>{footer}</footer>
      </div>
    </div>
  )
}
