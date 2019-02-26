import React from "react";
import { connect } from "react-redux";

import Todo from "./Todo";

const TodoList = ({ todos }) => (
  <div>
    {todos.map((todo, index) => (
      <Todo key={index} index={index} data={todo} />
    ))}
  </div>
);

export default connect(state => ({
  todos: state.todos
}))(TodoList);
