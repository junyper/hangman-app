import React, { useState, useEffect, useCallback } from 'react';

import { API_URL }  from './constants';
import { GameData } from './types';
import { Game } from './components/Game'

import './App.css';

function App() {
  const [data, setData] = useState<GameData | undefined>();

  const loadGameData = useCallback(() => {
    setData(undefined);
    fetch(API_URL)
      .then(response => response.json())
      .then(data => setData(data[0]))
      .catch(error => console.error(error));
  }, [setData]);

  useEffect(() => { loadGameData(); }, [loadGameData]);

  return (data ? <Game data={data} reloadGame={loadGameData} /> : <div className="Loading">Loading game data...</div>);
}

export default App;
