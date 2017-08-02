import React, { Component } from 'react'
import R from "ramda"
import Cookies from "js-cookie"

import Modal from "./Modal"

class Root extends Component {

  state = {
    open: false,
  }

  openThat = () => {
    this.setState({
      open: true,
    })
  }

  clearCookies = () => {
    R.forEach(Cookies.remove, R.keys(Cookies.get()))
  }

  render() {
    const { splitster } = this.props
    console.log("render", splitster.getSaveResults(), splitster.getAll(), splitster)
    return (
      <div>
        <h1>server rendering</h1>
        <div>
          {splitster.get("BUTTON_COLOR").value === "RED" ? "red tho" : "blue bro"}
        </div>
        {
          splitster.get("SHOW_ADD").value === "SHOW" && <div>Hello there I'm shown!</div>
        }
        {
          this.state.open && <Modal splitster={splitster} />
        }
        <button onClick={this.openThat}>Open me</button>
        <button onClick={this.clearCookies}>Clear all cookies</button>
      </div>
    )
  }
}

export default Root