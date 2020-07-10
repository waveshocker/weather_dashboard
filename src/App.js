import React from 'react';
import './App.css';
import Forecast from "./components/Forecast/Forecast";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1> React Weather App </h1>
        <main>
          <Forecast />
        </main>
      </header>
      <footer>
        Page created by waveshocker.
      </footer>
    </div>
  );
}

export default App;
