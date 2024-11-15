// ./src/components/PokemonCarousel.js

import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setMonster } from '../features/monsterSlice';
import '../styles/PokemonCarousel.css';

const POKEMON_LIMIT = 3; // Number of Pokémon to display per page

function PokemonCarousel() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [nextUrl, setNextUrl] = useState('https://pokeapi.co/api/v2/pokemon?limit=20&offset=0');
  const [selectedType, setSelectedType] = useState('');
  const loadedPokemons = useRef(new Set()); // A Set for caching loaded Pokémon
  const carouselRef = useRef(null);

  const dispatch = useDispatch();

  // Function to load Pokémon data
  const loadPokemons = async () => {
    if (loading || !nextUrl) return; // Prevent multiple requests
    setLoading(true);

    try {
      const response = await fetch(nextUrl);
      const data = await response.json();
      setPokemons((prev) => [...prev, ...data.results]);
      setNextUrl(data.next);
    } catch (error) {
      console.error('Error loading Pokémon:', error);
    } finally {
      setLoading(false);
    }
  };

  // Load Pokémon data when the component is mounted or `nextUrl` changes
  useEffect(() => {
    loadPokemons();
  }, []);

  // Handle Pokémon selection
  const handlePokemonSelect = async (pokemonUrl) => {
    if (loadedPokemons.current.has(pokemonUrl)) return; // Avoid duplicate loading

    try {
      const response = await fetch(pokemonUrl);
      const pokemonData = await response.json();
      const pokemon = {
        id: pokemonData.id, // Add ID for further use
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

      dispatch(setMonster(pokemon)); // Dispatch selected Pokémon data to the Redux store
      loadedPokemons.current.add(pokemonUrl); // Cache the loaded Pokémon URL
    } catch (error) {
      console.error('Error selecting Pokémon:', error);
    }
  };

  // Update the selected type for filtering Pokémon
  const handleTypeFilterChange = (e) => {
    setSelectedType(e.target.value);
  };

  // Automatically load more Pokémon when scrolling reaches the bottom of the carousel
  const handleScroll = (e) => {
    const bottom = e.target.scrollHeight === e.target.scrollTop + e.target.clientHeight;
    if (bottom && !loading) {
      loadPokemons();
    }
  };

  // Scroll the carousel to the left
  const scrollLeft = () => {
    carouselRef.current.scrollBy({ left: -200, behavior: 'smooth' });
  };

  // Scroll the carousel to the right
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
          {/* Add other types as needed */}
        </select>
      </div>

      <div className="carousel" ref={carouselRef} onScroll={handleScroll}>
        {pokemons
          .filter((pokemon) => {
            if (!selectedType) return true; // Show all Pokémon if no filter is selected
            return pokemon.url.includes(`type/${selectedType}`); // Filter Pokémon by type
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

      {/* !!! LOADING MOCK-UP TURNED OFF */}
      {/* {loading && <p>Loading more Pokémon...</p>} */}
    </div>
  );
}

export default PokemonCarousel;

