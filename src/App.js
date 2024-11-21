import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setMonster } from './features/monsterSlice';
import { fetchMonster } from './services/pokeApi';
import './styles/main.css';
import Home from './pages/Home.js';
import Arena from './components/Arena.js';
import Battle from './components/Battle';
import { HashRouter as Router, Route, Routes } from 'react-router-dom'; // Используем HashRouter

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadMonster = async () => {
      try {
        const data = await fetchMonster(""); // STARTING POKEMON !!!
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
      } catch (error) {
        console.error("Error loading the default monster:", error);
      }
    };

    loadMonster();
  }, [dispatch]);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/arena" element={<Arena />} />
          <Route path="/battle" element={<Battle />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
