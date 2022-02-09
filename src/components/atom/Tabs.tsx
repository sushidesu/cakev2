import clsx from "clsx"
import React, { useCallback, useState } from "react"

type TabsProps = {
  labels: string[]
  children: JSX.Element[]
}

export const Tabs = (props: TabsProps): JSX.Element => {
  const { labels, children } = props

  const [visibles, handleClickTabs] = useTabs(children.length)

  return (
    <div>
      <div className={clsx("tabs")}>
        <ul>
          {labels.map((label, i) => (
            <li
              key={i}
              className={clsx(visibles[i] && "is-active")}
              onClick={handleClickTabs(i)}
            >
              <a>
                <span>{label}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div>
        {children
          .filter((_, i) => visibles[i])
          .map((child, i) => (
            <div key={i}>{child}</div>
          ))}
      </div>
    </div>
  )
}

const useTabs = (length: number) => {
  const [visibleTabs, setVisible] = useState(
    Array.from({ length }).map((_, i) => {
      if (i === 0) {
        // １つ目のタブを表示する
        return true
      } else {
        return false
      }
    })
  )

  const handleClickTab = useCallback(
    (index: number) => () => {
      setVisible((prev) => {
        return prev.map((_, i) => index === i)
      })
    },
    []
  )

  return [visibleTabs, handleClickTab] as const
}
