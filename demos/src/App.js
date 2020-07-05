import React from 'react';
import Text from '@ruiyun/react-text'
import { XCenterView } from '@ruiyun/react-layout-suite'
import logo from './logo.svg';
import './App.css';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to <Text color='red'>reload2</Text>.
        </p>
        <XCenterView height='200px' width='300px' bgColor='#fff'>
          <Text>健康健康科技</Text>
        </XCenterView>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
