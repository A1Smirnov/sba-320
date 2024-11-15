// ./src/pages/Home.js

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMonster } from '../features/monsterSlice';
import { fetchMonster } from '../services/pokeApi';
import MonsterCard from '../components/MonsterCard';
import '../styles/Home.css';
import PokemonCarousel from '../components/PokemonCarousel.js';

function Home() {
  const dispatch = useDispatch();
  const [monsterName, setMonsterName] = useState('');
  const [isCustom, setIsCustom] = useState(false);
  const monster = useSelector((state) => state.monster);

  const handleMonsterSelect = async (name) => {
    const data = await fetchMonster(name);
    if (data) {
      dispatch(setMonster({
        name: data.name,
        type: data.types?.[0]?.type?.name || 'Unknown',
        stats: {
          hp: data.stats?.[0]?.base_stat || 'N/A',
          attack: data.stats?.[1]?.base_stat || 'N/A',
          defense: data.stats?.[2]?.base_stat || 'N/A',
          speed: data.stats?.[5]?.base_stat || 'N/A'
        },
        sprite: data.sprites?.front_default || ''
      }));
    }
  };

  const handleCreateCustomMonster = () => {
    // Cr custom creature
    setIsCustom(true);
  };

  return (
    <div className="home">
      <h1>Welcome to Pokemon Tactical Arena!</h1>
      <p>Select or create a monster to begin your adventure!</p>

      <div className="monster-selection">
        <button onClick={handleCreateCustomMonster}>Create Custom Monster</button>

        <div className="input-group">
          <input
            type="text"
            value={monsterName}
            onChange={(e) => setMonsterName(e.target.value)}
            placeholder="Enter Pokémon name"
          />
          <button onClick={() => handleMonsterSelect(monsterName)}>
            Choose Pokémon
          </button>
        </div>
      </div>

      {/* MonsterCard to view component */}
      {monster.name && <MonsterCard monster={monster} />}

      <PokemonCarousel /> {/* CAROUSEL! */}

      <button className="start-game-button">
        Go Arena!
      </button>
    </div>
  );
}

export default Home;

