import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import './App.css';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Oh no another fucking todo App</h1>
          </header>
          <RaisedButton label="Bagel me" />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
