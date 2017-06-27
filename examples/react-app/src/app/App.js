import React, { Component } from 'react'

class App extends Component {
  render() {
    const { splitster } = this.props
    console.log("render", this.props)
    return (
      <html>
      <head>
        <title>server rendering</title>
      </head>
      <body data-splitster={JSON.stringify(splitster.getSaveResults())}>
        <h1>server rendering</h1>
        <div>
          {splitster.get("BUTTON_COLOR").value === "RED" ? "red tho" : "blue bro"}
        </div>
        <script src='/bundle.js' />
      </body>
      </html>
    )
  }
}

export default App