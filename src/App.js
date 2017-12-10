import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TodoList from './TodoList/TodoList';
import './App.css';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">do it.</h1>
          </header>
          <TodoList />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
