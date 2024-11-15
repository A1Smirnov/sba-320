// ./src/components/PokemonCarousel.js

import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setMonster } from '../features/monsterSlice';
import { fetchMonster } from '../services/pokeApi';
import '../styles/PokemonCarousel.css';

const POKEMON_LIMIT = 3;  // POKEMON LIMIT ON A PAGE!!!

function PokemonCarousel() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [nextUrl, setNextUrl] = useState('https://pokeapi.co/api/v2/pokemon?limit=20&offset=0');
  const [selectedType, setSelectedType] = useState('');
  const loadedPokemons = useRef(new Set()); // Set for caching
  const carouselRef = useRef(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const loadPokemons = async () => {
      if (loading) return;
      setLoading(true);

      try {
        const response = await fetch(nextUrl);
        const data = await response.json();
        setPokemons((prev) => [...prev, ...data.results]);
        setNextUrl(data.next);
      } catch (error) {
        console.error('Error loading pokemons:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPokemons();
  }, [nextUrl]);

  const handlePokemonSelect = async (pokemonUrl) => {
    if (loadedPokemons.current.has(pokemonUrl)) return; // To avoid double loading

    try {
      const data = await fetch(pokemonUrl);
      const pokemonData = await data.json();
      const pokemon = {
        id: pokemonData.id, // Добавляем ID
        name: pokemonData.name,
        type: pokemonData.types[0]?.type?.name || 'Unknown',
        stats: {
          hp: pokemonData.stats[0]?.base_stat || 'N/A',
          attack: pokemonData.stats[1]?.base_stat || 'N/A',
          defense: pokemonData.stats[2]?.base_stat || 'N/A',
          speed: pokemonData.stats[5]?.base_stat || 'N/A',
        },
        sprite: pokemonData.sprites?.front_default || '',
      };

      dispatch(setMonster(pokemon));
      loadedPokemons.current.add(pokemonUrl); // Caching pokemons
    } catch (error) {
      console.error('Error selecting pokemon:', error);
    }
  };

  const handleTypeFilterChange = (e) => {
    setSelectedType(e.target.value);
  };

  const handleScroll = (e) => {
    const bottom = e.target.scrollHeight === e.target.scrollTop + e.target.clientHeight;
    if (bottom && !loading) {
      loadPokemons();
    }
  };

  const scrollLeft = () => {
    carouselRef.current.scrollBy({ left: -200, behavior: 'smooth' });
  };

  const scrollRight = () => {
    carouselRef.current.scrollBy({ left: 200, behavior: 'smooth' });
  };

  return (
    <div className="pokemon-carousel">
      <div className="filters">
        <select onChange={handleTypeFilterChange} value={selectedType}>
          <option value="">Select Type</option>
          <option value="fire">Fire</option>
          <option value="water">Water</option>
          <option value="electric">Electric</option>
          {/* Add other types */}
        </select>
      </div>

      <div className="carousel" ref={carouselRef} onScroll={handleScroll}>
        {pokemons
          .filter((pokemon) => {
            if (!selectedType) return true; // Show all without filter
            return pokemon.url.includes(`type/${selectedType}`);
          })
          .map((pokemon) => (
            <div
              key={pokemon.name}
              className="pokemon-item"
              onClick={() => handlePokemonSelect(pokemon.url)}
            >
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/')[6]}.png`}
                alt={pokemon.name}
              />
              <p>{pokemon.name}</p>
            </div>
          ))}
      </div>

      <button className="scroll-left" onClick={scrollLeft}>←</button>
      <button className="scroll-right" onClick={scrollRight}>→</button>

      {loading && <p>Loading more pokemons...</p>}
    </div>
  );
}

export default PokemonCarousel;
