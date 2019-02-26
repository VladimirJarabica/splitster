import React, { Component } from "react";
import { connect } from "react-redux";

import { removeTodo } from "../store/todosReducer";

class Todo extends Component {
  remove = () => {
    const { index, dispatch } = this.props;
    dispatch(removeTodo(index));
  };

  render() {
    const { data } = this.props;

    return (
      <span>
        {data}
        &nbsp;
        <span onClick={this.remove}>X</span>
      </span>
    );
  }
}

export default connect()(Todo);
