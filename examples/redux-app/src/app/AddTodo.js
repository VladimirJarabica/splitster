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

  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.todo}
          onChange={this.handleChange}
        />
        <button onClick={this.add}>Add</button>
      </div>
    )
  }
}

export default connect()(AddTodo)
