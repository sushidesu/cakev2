import React from "react"
import ReactDOM from "react-dom"
import styled from "styled-components"
import Header from "./components/header"
import ItemEditor from "./components/itemEditor"

const Wrapper = styled.div`
  margin: 10px;
  .sidemenu {
    min-width: 230px;
  }
`

const Options = () => (
  <Wrapper>
    <Header />
    <ItemEditor />
  </Wrapper>
)

ReactDOM.render(<Options />, document.getElementById('root'))
