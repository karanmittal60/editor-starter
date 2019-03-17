import React, { Component } from 'react';
import './App.css';
// import FirstEditor from './Components/FirstEditor';
import SecondEditor from './Components/SecondEditor';
import ThirdEditor from './Components/ThirdEditor';
import RichTextExample from "./Components/RichTextExample";
import EmoTest from "./Components/EmoTest";
import CombineTwoEditor from "./Components/CombineTwoEditor";

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Home</h1>
          {/*<FirstEditor/>*/}
        {/*<SecondEditor />*/}
          {/*<ThirdEditor/>*/}
          {/*<RichTextExample/>*/}
          <CombineTwoEditor/>
          {/*<EmoTest/>*/}

      </div>
    );
  }
}

export default App;
