import React, { ForwardRefRenderFunction } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUpload } from "@fortawesome/free-solid-svg-icons"

export type Props = {
  onChange?: JSX.IntrinsicElements["input"]["onChange"]
  filename?: string
}

const _FileInput: ForwardRefRenderFunction<HTMLInputElement, Props> = (
  { onChange, filename },
  ref
) => {
  return (
    <div className="file has-name is-fullwidth">
      <label className="file-label">
        <input
          onChange={onChange}
          ref={ref}
          className="file-input"
          type="file"
          accept=".json"
          name="resume"
        />
        <span className="file-cta">
          <span className="file-icon">
            <FontAwesomeIcon icon={faUpload} />
          </span>
          <span className="file-label">ファイルを選択</span>
        </span>
        <span className="file-name">{filename}</span>
      </label>
    </div>
  )
}

export const FileInput = React.forwardRef(_FileInput)
