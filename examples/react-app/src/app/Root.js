import React, { Component } from 'react'
import R from "ramda"
import Cookies from "js-cookie"

class Root extends Component {
  clearCookies = () => {
    R.forEach(Cookies.remove, R.keys(Cookies.get()))
  }

  render() {
    const { splitster } = this.props
    console.log("render", this.props)
    return (
      <div>
        <h1>server rendering</h1>
        <div>
          {splitster.get("BUTTON_COLOR").value === "RED" ? "red tho" : "blue bro"}
        </div>
        {
          splitster.get("SHOW_ADD").value === "SHOW" && <div>Hello there I'm shown!</div>
        }
        <button onClick={this.clearCookies}>Clear all cookies</button>
      </div>
    )
  }
}

export default Root