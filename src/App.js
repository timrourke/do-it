import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TodoListContainer from './containers/TodoListContainer';
import { loadState, saveState } from './localStorage';
import todoApp from './reducers';
import './App.css';

// Attempt to load persisted state from local storage
const persistedState = loadState();

const store = createStore(
  todoApp,
  persistedState
);

// Persist the state on window.onunload
window.onunload = () => saveState(store.getState());

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
