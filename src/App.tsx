import React from 'react';
import Snake from './assets/snake';

const App: React.FC = () => {
  return (
    <div className="App">
      <Snake length={1} playground={[[0, 0], [60, 60]]} ></Snake>
    </div>
  );
}

export default App;
