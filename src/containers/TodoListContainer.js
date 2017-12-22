import { connect } from 'react-redux'
import TodoList from './../components/TodoList/TodoList';
import {
  addTodo,
  completeTodo,
  deleteTodo,
} from './../actions/index';

const mapStateToProps = state => {
  return {
    todos: state.todos,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addNewTodoTask(task) {
      dispatch(addTodo(task));
    },
    completeTodoTask(id) {
      dispatch(completeTodo(id));
    },
    deleteTodoTask(id) {
      dispatch(deleteTodo(id));
    },
  };
};

const TodoListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);

export default TodoListContainer;
