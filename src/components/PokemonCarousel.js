import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setMonster } from '../features/monsterSlice';
import '../styles/PokemonCarousel.css';

const POKEMON_LIMIT = 3; // Number of Pokémon to display per page

function PokemonCarousel() {
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]); // Покемоны после фильтрации
  const [types, setTypes] = useState([]); // Список типов покемонов
  const [loading, setLoading] = useState(false);
  const [nextUrl, setNextUrl] = useState('https://pokeapi.co/api/v2/pokemon?limit=20&offset=0');
  const [selectedType, setSelectedType] = useState('');
  const loadedPokemons = useRef(new Set()); // Set для кеширования загруженных покемонов
  const carouselRef = useRef(null);

  const dispatch = useDispatch();

  // Функция для загрузки данных о покемонах
  const loadPokemons = async () => {
    if (loading || !nextUrl) return; // Предотвращаем несколько запросов
    setLoading(true);

    try {
      const response = await fetch(nextUrl);
      const data = await response.json();
      const pokemonDetails = await Promise.all(
        data.results.map(async (pokemon) => {
          const res = await fetch(pokemon.url);
          const details = await res.json();
          return {
            id: details.id,
            name: details.name,
            sprite: details.sprites.front_default,
            types: details.types.map((t) => t.type.name), // Массив типов покемона
          };
        })
      );

      setPokemons((prev) => [...prev, ...pokemonDetails]); // Добавляем новые покемоны в список
      setFilteredPokemons((prev) => [...prev, ...pokemonDetails]); // Обновляем список отфильтрованных покемонов
      setNextUrl(data.next); // Обновляем URL для следующей страницы покемонов
    } catch (error) {
      console.error('Error loading Pokémon:', error);
    } finally {
      setLoading(false);
    }
  };

  // Функция для загрузки типов покемонов
  const loadTypes = async () => {
    try {
      const response = await fetch('https://pokeapi.co/api/v2/type/');
      const data = await response.json();
      setTypes(data.results); // Сохраняем список типов
    } catch (error) {
      console.error('Error loading Pokémon types:', error);
    }
  };

  // Обновляем список покемонов при смене типа
  useEffect(() => {
    if (selectedType) {
      setFilteredPokemons(
        pokemons.filter((pokemon) => pokemon.types.includes(selectedType))
      );
    } else {
      setFilteredPokemons(pokemons); // Если тип не выбран, показываем всех покемонов
    }
  }, [selectedType, pokemons]); // Эффект срабатывает при изменении типа или списка покемонов

  // Загрузка данных при монтировании компонента
  useEffect(() => {
    loadPokemons();
    loadTypes();
  }, []);

  const handleTypeFilterChange = (e) => {
    setSelectedType(e.target.value); // Обновляем выбранный тип
  };

  const handlePokemonSelect = (pokemon) => {
    dispatch(setMonster(pokemon)); // Отправляем данные покемона в Redux
  };

  const scrollLeft = () => {
    carouselRef.current.scrollBy({ left: -500, behavior: 'smooth' });
  };

  const scrollRight = () => {
    carouselRef.current.scrollBy({ left: 500, behavior: 'smooth' });
  };

  const handleScroll = (e) => {
    const bottom = e.target.scrollHeight === e.target.scrollTop + e.target.clientHeight;
    if (bottom && !loading) {
      loadPokemons(); // Загружаем новые покемоны при достижении низа карусели
    }
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
        {filteredPokemons.map((pokemon) => (
          <div
            key={pokemon.id}
            className="pokemon-item"
            onClick={() => handlePokemonSelect(pokemon)}
          >
            <img src={pokemon.sprite} alt={pokemon.name} />
            <p>{pokemon.name}</p>
          </div>
        ))}
      </div>

      <button className="scroll-left" onClick={scrollLeft}>
        ←
      </button>
      <button className="scroll-right" onClick={scrollRight}>
        →
      </button>

      {loading && <p>Loading more Pokémon...</p>}
    </div>
  );
}

export default PokemonCarousel;
