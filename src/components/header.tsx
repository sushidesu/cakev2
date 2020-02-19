import React from "react"
import { Navbar, Container } from "react-bulma-components"
import Logo from "../images/sweets_cheesecake.png"

export default () => (
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
              <Navbar.Item>インポート</Navbar.Item>
              <Navbar.Item>エクスポート</Navbar.Item>
            </Navbar.Dropdown>
          </Navbar.Item>
        </Navbar.Container>
      </Navbar.Menu>
    </Container>
  </Navbar>
)
