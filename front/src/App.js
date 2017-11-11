import React, { Component } from 'react';
import './App.css';
import Test from './components/Test.js'
import { Link } from 'react-router-dom';

import router from './router.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        { router }
      </div>
    );
  }
}

export default App;
