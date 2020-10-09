import React, { useState, useEffect } from "react"
import { Navbar, Container } from "react-bulma-components"
import Logo from "../images/sweets_cheesecake.png"
import ImportModal from "./importModal"
import ExportModal from "./exportModal"

export default () => {
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
      <Navbar className={"has-shadow"}>
        <Container>
          <Navbar.Brand>
            <div className="navbar-item" style={{ userSelect: "none" }}>
              <img src={Logo} />
              <span style={{ marginLeft: "6px", fontSize: "1.1em" }}>Cake</span>
            </div>
          </Navbar.Brand>
          <Navbar.Menu>
            <Navbar.Container position="end">
              <Navbar.Item dropdown hoverable>
                <Navbar.Link>設定</Navbar.Link>
                <Navbar.Dropdown>
                  <Navbar.Item onClick={() => setShow(true)}>
                    インポート
                  </Navbar.Item>
                  <Navbar.Item onClick={() => setShowExport(true)}>
                    エクスポート
                  </Navbar.Item>
                </Navbar.Dropdown>
              </Navbar.Item>
            </Navbar.Container>
          </Navbar.Menu>
        </Container>
      </Navbar>

      <ImportModal show={show} setShow={setShow} />
      <ExportModal show={showExport} closeModal={() => setShowExport(false)} />
    </>
  )
}
