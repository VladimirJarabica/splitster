import React, { Component } from 'react'
import R from "ramda"

class App extends Component {
  shouldComponentUpdate() {
    console.log("shouldComponentUpdate")
    return false
  }

  render() {
    console.log("render", this.props)
    return (
      <html>
      <head>
        <title>server rendering</title>
      </head>
      <body data-splitster={JSON.stringify(this.props.splitster.getSaveResults())}>
      {/*<body data-splitster={JSON.stringify(this.props.x)}>*/}
      {/*<body>*/}
        <h1>server rendering</h1>
        <script src='/bundle.js' />
      </body>
      </html>
    )
  }
}

export default App