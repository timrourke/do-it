import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import todoApp from './reducers';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TodoListContainer from './containers/TodoListContainer';
import './App.css';
import { loadState, saveState } from './localStorage';

const persistedState = loadState();

const store = createStore(
  todoApp,
  persistedState
);

store.subscribe(() => {
  saveState(store.getState());
});

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MuiThemeProvider>
          <div className="App">
            <header className="App-header">
              <h1 className="App-title">do it.</h1>
            </header>
            <TodoListContainer />
          </div>
        </MuiThemeProvider>
      </Provider>
    );
  }
}

export default App;
