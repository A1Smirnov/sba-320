// ./src/components/PokemonCarousel.js

import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setMonster } from '../features/monsterSlice';
import '../styles/PokemonCarousel.css';

const POKEMON_LIMIT = 3; // Number of Pokémon to display per page

function PokemonCarousel() {
  const [pokemons, setPokemons] = useState([]);
  const [types, setTypes] = useState([]); // Store Pokémon types
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

  // Function to load Pokémon types
  const loadTypes = async () => {
    try {
      const response = await fetch('https://pokeapi.co/api/v2/type/');
      const data = await response.json();
      setTypes(data.results); // Save the list of types
    } catch (error) {
      console.error('Error loading Pokémon types:', error);
    }
  };

  // Load Pokémon data and types when the component is mounted
  useEffect(() => {
    loadPokemons();
    loadTypes();
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
    carouselRef.current.scrollBy({ left: -500, behavior: 'smooth' });
  };

  // Scroll the carousel to the right
  const scrollRight = () => {
    carouselRef.current.scrollBy({ left: 500, behavior: 'smooth' });
  };

  return (
    <div className="pokemon-carousel">
      <div className="filters">
        <select onChange={handleTypeFilterChange} value={selectedType}>
          <option value="">Select Type</option>
          {types.map((type) => (
            <option key={type.name} value={type.name}>
              {type.name.charAt(0).toUpperCase() + type.name.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="carousel" ref={carouselRef} onScroll={handleScroll}>
      {pokemons
          .filter(async (pokemon) => {
            if (!selectedType) return true; // Show all Pokémon if no filter is selected

            // Fetch Pokémon details to get their types
            const response = await fetch(pokemon.url);
            const data = await response.json();
            const pokemonTypes = data.types.map((type) => type.type.name);

            return pokemonTypes.includes(selectedType); // Filter Pokémon by type
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

