import React from "react"

const css = (_: unknown) => ""

export type Props = {
  label: string
  remove: () => void
  moveUp: () => void
  moveDown: () => void
  children?: React.ReactNode
}

export function BlockEditorWrapper({
  label,
  remove,
  moveUp,
  moveDown,
  children,
}: Props): JSX.Element {
  return (
    <div
      className={css`
        position: relative;
        padding: 20px 24px;
        box-shadow: 2px 4px 12px rgba(73, 73, 60, 0.2);
      `}
    >
      <p
        className={css`
          display: block;
          font-weight: bold;
          margin: 0;
        `}
      >
        {label}
      </p>
      <div
        className={css`
          margin-top: 1rem;
        `}
      >
        {children}
      </div>
      <div
        className={css`
          position: absolute;
          top: 10px;
          right: 10px;
          display: flex;
          flex-direction: column;
          & > button + button {
            margin-top: 8px;
          }
        `}
      >
        <button onClick={remove}>X</button>
        <button onClick={moveUp}>↑</button>
        <button onClick={moveDown}>↓</button>
      </div>
    </div>
  )
}
