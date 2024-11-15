// ./src/components/Arena.js

import React from 'react';
import { useSelector } from 'react-redux';
import '../styles/Arena.css';

function Arena() {
  const monster = useSelector((state) => state.monster);

  return (
    <div className="arena">
      <h1>Battle Arena</h1>
      <div className="battlefield">
        {/* Игрок */}
        <div className="player">
          <h2>{monster.name || 'Your Monster'}</h2>
          <img src={monster.sprite} alt={monster.name} />
          <p>HP: {monster.stats?.hp || 'N/A'}</p>
          <p>Attack: {monster.stats?.attack || 'N/A'}</p>
          <p>Defense: {monster.stats?.defense || 'N/A'}</p>
          <p>Speed: {monster.stats?.speed || 'N/A'}</p>
        </div>

        {/* Оппонент (заглушка пока) */}
        <div className="opponent">
          <h2>Opponent</h2>
          <p>Coming soon...</p>
        </div>
      </div>

      {/* Кнопка возврата */}
      <button onClick={() => window.history.back()}>Return</button>
    </div>
  );
}

export default Arena;
