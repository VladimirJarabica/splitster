import R from "ramda";

export const ADD_TODO = "ADD_TODO";
export const REMOVE_TODO = "REMOVE_TODO";

const initialState = [];

const todosReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return R.append(action.todo, state);
    case REMOVE_TODO:
      return R.remove(action.index, 1, state);
    default:
      return state;
  }
};

export const addTodo = todo => ({
  type: ADD_TODO,
  todo
});

export const removeTodo = index => ({
  type: REMOVE_TODO,
  index
});

export default todosReducer;
