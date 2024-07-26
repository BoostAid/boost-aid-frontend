import React from 'react';
import logo from './logo.svg';
import './App.css';
import {NextUIProvider} from "@nextui-org/react";


function App() {
  return (
    <NextUIProvider>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <h1 className="text-4xl font-bold text-blue-600">Tailwind CSS is working!</h1>
        </header>
      </div>
    </NextUIProvider>
  );
}

export default App;