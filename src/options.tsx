import React from "react"
import ReactDOM from "react-dom"
import styled from "styled-components"
import Header from "./components/header"

const Wrapper = styled.div`
  margin: 10px;
  .sidemenu {
    min-width: 230px;
  }
`

const Options = () => (
  <Wrapper>
    <Header />
    <h1>Cake Option</h1>
  </Wrapper>
)

ReactDOM.render(<Options />, document.getElementById('root'))
