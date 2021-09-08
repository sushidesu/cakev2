import React, { useState, useEffect } from "react"
import clsx from "clsx"
import Logo from "../images/sweets_cheesecake.png"
import ImportModal, { Props as ImportModalProps } from "./importModal"
import ExportModal from "./exportModal"
import { Item } from "../domain/item/item"

export type Props = {
  itemList: Item[]
  resetItemCollection: ImportModalProps["resetItemCollection"]
}

function Header({ itemList, resetItemCollection }: Props): JSX.Element {
  const [show, setShow] = useState(false)
  const [showExport, setShowExport] = useState(false)
  useEffect(() => {
    if (show || showExport) {
      document.documentElement.classList.add("is-clipped")
    } else {
      document.documentElement.classList.remove("is-clipped")
    }
  }, [show])

  return (
    <>
      <nav className={clsx("navbar", "has-shadow")}>
        <div className={clsx("container")}>
          <div className={clsx("navbar-brand")}>
            <div className="navbar-item" style={{ userSelect: "none" }}>
              <img src={Logo} />
              <span style={{ marginLeft: "6px", fontSize: "1.1em" }}>Cake</span>
            </div>
          </div>
          <div className={clsx("navbar-menu")}>
            <div className={clsx("navbar-end")}>
              <div
                className={clsx("navbar-item", "has-dropdown", "is-hoverable")}
              >
                <span className={clsx("navbar-link")}>設定</span>
                <div className={clsx("navbar-dropdown")}>
                  <a
                    className={clsx("navbar-item")}
                    onClick={() => setShow(true)}
                  >
                    インポート
                  </a>
                  <a
                    className={clsx("navbar-item")}
                    onClick={() => setShowExport(true)}
                  >
                    エクスポート
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <ImportModal
        show={show}
        setShow={setShow}
        resetItemCollection={resetItemCollection}
      />
      <ExportModal
        itemList={itemList}
        show={showExport}
        closeModal={() => setShowExport(false)}
      />
    </>
  )
}

export default Header
