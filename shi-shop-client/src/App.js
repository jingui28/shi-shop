import React from 'react';
import logo from './shi.png';
import './App.css';
import {Button} from 'antd-mobile'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <Button type='primary'>学习</Button>
    </div>
  );
}

export default App;
