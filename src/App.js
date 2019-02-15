import React, { Component } from 'react';
import './App.css';
// import FirstEditor from './Components/FirstEditor';
import SecondEditor from './Components/SecondEditor';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Home</h1>
          {/*<FirstEditor/>*/}
        <SecondEditor />

      </div>
    );
  }
}

export default App;
