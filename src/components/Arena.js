// ./src/components/Arena.js

import React, { useState } from 'react';
import { fetchMonster } from '../services/pokeApi';
import { useSelector } from 'react-redux';
import '../styles/Arena.css';

const MAX_POKEMON_ID = 151; // Первое поколение

const Arena = () => {
  const [opponent, setOpponent] = useState(null);
  const [opponentHP, setOpponentHP] = useState(100);
  const [playerHP, setPlayerHP] = useState(100);
  const player = useSelector((state) => state.monster);

  const generateRandomPokemon = async () => {
    const randomId = Math.floor(Math.random() * MAX_POKEMON_ID) + 1;
    const data = await fetchMonster(randomId);
    if (data) {
      setOpponent({
        name: data.name,
        sprite: data.sprites?.front_default || '',
        stats: { hp: 100 }, // Простая установка HP
      });
      setOpponentHP(100); // Сброс HP для нового покемона
    }
  };

  const attackOpponent = () => {
    if (!opponent) return;
    const damage = Math.floor(Math.random() * 10) + 5; // Урон от 5 до 15
    setOpponentHP((prev) => Math.max(prev - damage, 0));
  };

  const attackPlayer = () => {
    const damage = Math.floor(Math.random() * 10) + 5;
    setPlayerHP((prev) => Math.max(prev - damage, 0));
  };

  const handleNextTurn = () => {
    attackOpponent(); // Атака игрока
    if (opponentHP - 10 > 0) {
      setTimeout(() => attackPlayer(), 1000); // Ответ соперника
    }
  };

  return (
    <div className="arena">
      <h1>Arena Battle</h1>
      <div className="battlefield">
        <div className="player">
          {player && (
            <>
              <img src={player.sprite} alt={player.name} />
              <p>{player.name}</p>
              <p>HP: {playerHP}</p>
            </>
          )}
        </div>
        <div className="opponent">
          {opponent ? (
            <>
              <img
                src={opponent.sprite}
                alt={opponent.name}
                onClick={generateRandomPokemon}
                style={{ cursor: 'pointer' }}
              />
              <p>{opponent.name}</p>
              <p>HP: {opponentHP}</p>
            </>
          ) : (
            <button onClick={generateRandomPokemon}>Generate Opponent</button>
          )}
        </div>
      </div>
      <div className="controls">
        <button onClick={handleNextTurn} disabled={!opponent}>
          Attack
        </button>
      </div>
      {opponentHP <= 0 && <p>Opponent defeated! Click to generate a new opponent.</p>}
      {playerHP <= 0 && <p>You have been defeated!</p>}
    </div>
  );
};

export default Arena;
