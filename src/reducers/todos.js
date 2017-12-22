import {
  ADD_TODO,
  COMPLETE_TODO,
  DELETE_TODO,
} from './../actions/index';

import uuid from 'uuid';

export default function todos(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          id: uuid.v1(),
          task: action.task,
          completedDate: null,
          createdDate: new Date(),
        },
      ];
    case COMPLETE_TODO:
      return state
        .map((todo) => {
          if (todo.id === action.id) {
            todo.completedDate = (!!todo.completedDate) ?
              null :
              new Date();
          }

          return todo;
        });
    case DELETE_TODO:
      return state
        .filter((todo) => todo.id !== action.id);
    default:
      return state;
  }
}
