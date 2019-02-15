import React, { Component } from 'react';
import './App.css';
import FirstEditor from './Components/FirstEditor'

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Home</h1>
          <FirstEditor/>

      </div>
    );
  }
}

export default App;
