import React, { Component } from 'react';
import './App.css';
// import FirstEditor from './Components/FirstEditor';
import SecondEditor from './Components/SecondEditor';
import ThirdEditor from './Components/ThirdEditor';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Home</h1>
          {/*<FirstEditor/>*/}
        <SecondEditor />
          <ThirdEditor/>

      </div>
    );
  }
}

export default App;
