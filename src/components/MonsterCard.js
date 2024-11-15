// ./src/components/MonsterCard.js

import React from 'react';

function MonsterCard({ monster }) {
  return (
    <div className="monster-card">
      <h2>Pokemon: {monster.name}</h2>
      {monster.sprite && (
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${monster.id}.png`}
          alt={monster.name}
        />
      )}
      <p>Type: {monster.type}</p>
      <p>HP: {monster.stats.hp}</p>
      <p>Attack: {monster.stats.attack}</p>
      <p>Defense: {monster.stats.defense}</p>
      <p>Speed: {monster.stats.speed}</p>

    </div>
  );
}

export default MonsterCard;
