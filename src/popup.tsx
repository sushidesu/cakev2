import React from "react"
import ReactDOM from "react-dom"

const Popup = () => (
  <>
    <h1>home</h1>
    <p>this is cake</p>
    <button
      onClick={() => {
        chrome.tabs.executeScript({
          file: "./content.bundle.js",
        })
      }}
    >
      Click
    </button>
  </>
)

ReactDOM.render(<Popup />, document.getElementById("root"))
