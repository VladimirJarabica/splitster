import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addTodo } from '../store/todosReducer'

class AddTodo extends Component {
  state = {
    todo: '',
  }

  add = () => {
    const todo = this.state.todo
    this.setState({ todo: '' }, () => {
      this.props.dispatch(addTodo(todo))
    })
  }

  handleChange = e => {
    this.setState({ todo: e.target.value })
  }

  renderButton = () => {
    const { splitster } = this.props
    const colorVariant = splitster.get('BUTTON_COLOR')
    return (
      <button
        onClick={this.add}
        style={{ backgroundColor: colorVariant.value }}
      >
        Add
      </button>
    )
  }

  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.todo}
          onChange={this.handleChange}
        />
        {this.renderButton()}
      </div>
    )
  }
}

export default connect(({ splitster }) => ({
  splitster,
}))(AddTodo)
