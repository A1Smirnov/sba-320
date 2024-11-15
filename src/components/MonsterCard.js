import React from 'react';

function MonsterCard({ monster }) {
  return (
    <div className="monster-card">
      <h2>Monster: {monster.name}</h2>
      <p>Type: {monster.type}</p>
      <p>HP: {monster.stats.hp}</p>
      <p>Attack: {monster.stats.attack}</p>
      <p>Defense: {monster.stats.defense}</p>
      <p>Speed: {monster.stats.speed}</p>
      {monster.sprite && <img src={monster.sprite} alt={monster.name} />}
    </div>
  );
}

export default MonsterCard;
