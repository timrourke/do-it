import React, { Component } from 'react';
import moment from 'moment';
import uuid from 'uuid';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import {
  Table,
  TableBody,
  TableFooter,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import TextField from 'material-ui/TextField';

/**
 * @type {String}
 * @final
 */
const ERROR_FIELD_REQUIRED = 'This field is required';

/**
 * A todo list
 *
 * @extends React.Component
 */
class TodoList extends Component {
  /**
   * Constructor
   *
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      addNewTodoTaskError: '',
      newTodoTask: '',
      tasks: []
    };

    this.addNewTodoTask = this.addNewTodoTask.bind(this);
    this.completeTodoTask = this.completeTodoTask.bind(this);
    this.deleteTodoTask = this.deleteTodoTask.bind(this);
    this.setNewTodoTask = this.setNewTodoTask.bind(this);
  }

  /**
   * Add a new todo task
   *
   * @param {Object} event
   */
  addNewTodoTask(event) {
    event.preventDefault();

    // Display an error if the task is empty
    if (!this.state.newTodoTask.trim().length) {
      this.setState({
        addNewTodoTaskError: ERROR_FIELD_REQUIRED,
        newTodoTask: '',
        tasks: this.state.tasks,
      });

      return;
    }

    const newTasks = this.state.tasks
      .slice()
      .concat({
        id: uuid.v1(),
        task: this.state.newTodoTask,
        completedDate: null,
        createdDate: new Date(),
      });

    this.setState({
      addNewTodoTaskError: '',
      newTodoTask: '',
      tasks: newTasks,
    });
  }

  /**
   * Complete a todo task
   *
   * @param {String} todoId
   */
  completeTodoTask(todoId) {
    const newTasks = this.state.tasks
      .slice()
      .map((todo) => {
        if (todo.id === todoId && !todo.completedDate) {
          todo.completedDate = new Date();
        } else if (todo.id === todoId && !!todo.completedDate) {
          todo.completedDate = null;
        }

        return todo;
      });

    this.setState(Object.assign(this.state, {tasks: newTasks}));
  }

  /**
   * Delete a todo task
   *
   * @param {String} todoId
   */
  deleteTodoTask(todoId) {
    const newTasks = this.state.tasks
      .slice()
      .filter((task) => {
        return task.id !== todoId;
      });

    this.setState(Object.assign(this.state, {tasks: newTasks}));
  }

  /**
   * Set the task for the new event
   *
   * @param {Object} event
   */
  setNewTodoTask(event) {
    this.setState({
      addNewTodoTaskError: (event.target.value.trim().length) ?
        '' :
        this.state.addNewTodoTaskError,
      newTodoTask: event.target.value,
      tasks: this.state.tasks,
    });
  }

  render() {
    return (
      <div className="TodoList">
				<Table
					fixedHeader={true}
					fixedFooter={true}
          selectable={false}
          multiSelectable={false}
				>
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
          >
            <TableRow>
              <TableHeaderColumn>Task</TableHeaderColumn>
              <TableHeaderColumn>Created</TableHeaderColumn>
              <TableHeaderColumn>Completed</TableHeaderColumn>
              <TableHeaderColumn></TableHeaderColumn>
              <TableHeaderColumn></TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={false}
            deselectOnClickaway={false}
            stripedRows={true}
          >
            {this.state.tasks
              .sort((a, b) => {
                if (a.completedDate === b.completedDate) {
                  return 0;
                }

                return a.completedDate > b.completedDate ?
                  1 :
                  -1;
              })
              .map((row) => (
              <TableRow key={row.id} style={{color: `${!!row.completedDate ? 'grey' : ''}`}}>
                <TableRowColumn>
                  {!!row.completedDate ? (
                    <del>{row.task}</del>
                  ) : (
                    <span>{row.task}</span>
                  )}
                </TableRowColumn>
                <TableRowColumn>
                  {new moment(row.createdDate).format('lll')}
                </TableRowColumn>
                <TableRowColumn>
                  {row.completedDate ? (
                    new moment(row.completedDate).format('lll')
                    ) : (
                      ''
                    )
                  }
                </TableRowColumn>
                <TableRowColumn>
                  <Checkbox
                    checked={!!row.completedDate}
                    label="Complete"
                    onCheck={() => this.completeTodoTask(row.id)}
                  />
                </TableRowColumn>
                <TableRowColumn>
                  <RaisedButton
                    label="Delete"
                    onClick={() => this.deleteTodoTask(row.id)}
                  />
                </TableRowColumn>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter
            adjustForCheckbox={false}
          >
            <TableRow>
              <TableRowColumn>
                <form onSubmit={this.addNewTodoTask}>
                  <TextField
                    errorText={this.state.addNewTodoTaskError}
                    name="add-new-task"
                    placeholder="New task"
                    value={this.state.newTodoTask}
                    onChange={this.setNewTodoTask}
                  />
                </form>
              </TableRowColumn>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    );
  }
}

export default TodoList;
