// ./src/App.js

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMonster } from './features/monsterSlice';
import { fetchMonster } from './services/pokeApi';
import './styles/main.css';
import Home from './pages/Home.js';

function App() {
    const dispatch = useDispatch();
  
    useEffect(() => {
      const loadMonster = async () => {
        const data = await fetchMonster("pikachu"); // Запрос на Pikachu
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
            sprite: data.sprites?.front_default || '' // Спрайт монстра
          }));
        }
      };
  
      loadMonster();
    }, [dispatch]);
  
    return (
      <div className="App">
        <Home />
      </div>
    );
  }
  
  export default App;
