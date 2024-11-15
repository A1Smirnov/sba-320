import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMonster } from '../features/monsterSlice.js';
import '../styles/Battle.css';

const Battle = () => {
  const dispatch = useDispatch();
  const playerMonster = useSelector((state) => state.monster);
  const [opponentMonster, setOpponentMonster] = useState(null);

  const [playerHP, setPlayerHP] = useState(playerMonster.stats.hp);
  const [opponentHP, setOpponentHP] = useState(100);

  const [turn, setTurn] = useState("player");
  const [battleLog, setBattleLog] = useState([]);

  const generateRandomOpponent = () => {
    const opponent = {
      name: "Bulbasaur",
      stats: { hp: 100 },
      sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
    };
    setOpponentMonster(opponent);
    setOpponentHP(opponent.stats.hp);
  };

  useEffect(() => {
    generateRandomOpponent();
  }, []);

  const handleAttack = () => {
    if (turn === "player") {
      const damage = Math.floor(Math.random() * 20); // DAMAGE!!!
      setOpponentHP((prev) => Math.max(prev - damage, 0));
      setBattleLog((prev) => [...prev, `${playerMonster.name} attacks! Opponent loses ${damage} HP!`]);
      setTurn("opponent");
  
      setTimeout(() => {
        const opponentDamage = Math.floor(Math.random() * 20);
        setPlayerHP((prev) => Math.max(prev - opponentDamage, 0));
        setBattleLog((prev) => [...prev, `Opponent attacks! You lose ${opponentDamage} HP!`]);
        setTurn("player");
      }, 150); // Attack DELAY!!!
    }
  };
  

  return (
    <div className="battle">
      <h2>Battle!</h2>
      <div className="battle-info">
        <div className="player-monster">
          <img src={playerMonster.sprite} alt={playerMonster.name} />
          <p>{playerMonster.name}</p>
          <p>HP: {playerHP}</p>
        </div>
        {opponentMonster && (
          <div className="opponent-monster">
            <img src={opponentMonster.sprite} alt={opponentMonster.name} />
            <p>{opponentMonster.name}</p>
            <p>HP: {opponentHP}</p>
          </div>
        )}
      </div>
      <div className="battle-log">
        {battleLog.map((log, index) => (
          <p key={index}>{log}</p>
        ))}
      </div>
      <div className="battle-actions">
        <button onClick={handleAttack} disabled={turn === "opponent"}>
          {turn === "player" ? "Attack" : "Opponent's Turn..."}
        </button>
      </div>
      {playerHP === 0 && <div className="battle-end">You lost!</div>}
      {opponentHP === 0 && <div className="battle-end">You won!</div>}
    </div>
  );
};

export default Battle;
