import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Pyramid from './pyramidy/pyramid';

var dummy = [
  {
    displayName: "1",
    fullName: "One",
    words:[
      "banane",
      "train",
      "test",
      "whatever",
      "kkchose"
    ]
  },
  {
    displayName: "2",
    fullName: "two"
  },
  {
    displayName: "3",
    fullName: "Three"
  }

]

class App extends Component {
  render() {
    return (
      <div className="App" id="app-container">
          <Pyramid categories={dummy} />
      </div>
    );
  }
}

export default App;
