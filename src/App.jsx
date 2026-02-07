import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import PokemonCard from './components/PokemonCard';
import './App.css';

function App() {
  const [allPokemon, setAllPokemon] = useState([]);
  const [currentPokemon, setCurrentPokemon] = useState(null);
  const [region, setRegion] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const generationRegionMap = {
    'generation-i': 'Kanto',
    'generation-ii': 'Johto',
    'generation-iii': 'Hoenn',
    'generation-iv': 'Sinnoh',
    'generation-v': 'Unova',
    'generation-vi': 'Kalos',
    'generation-vii': 'Alola',
    'generation-viii': 'Galar',
    'generation-ix': 'Paldea'
  };

  useEffect(() => {

    const fetchAllPokemon = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1000');
        const data = await response.json();
        setAllPokemon(data.results);
      } catch (err) {
        console.error("Failed to load pokemon list", err);
        setError("Failed to load Pokemon list.");
      }
    };
    fetchAllPokemon();
  }, []);

  const fetchPokemonData = async (query) => {
    if (!query) return;
    setLoading(true);
    setError(null);
    setCurrentPokemon(null);
    setRegion('');

    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query.toLowerCase()}`);
      if (!response.ok) {
        throw new Error('Pokemon not found!');
      }
      const data = await response.json();


      if (data.species && data.species.url) {
        try {
          const speciesRes = await fetch(data.species.url);
          const speciesData = await speciesRes.json();
          const genName = speciesData.generation.name;
          setRegion(generationRegionMap[genName] || genName);
        } catch (e) {
          console.warn('Failed to fetch species data', e);
          setRegion('Unknown');
        }
      }

      setCurrentPokemon(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <header className="app-branding">
        <h1 className="app-title">
          <img src={`${import.meta.env.BASE_URL}pokeball.svg`} alt="Pokeball" className="title-icon" />
          Pokédex
        </h1>
      </header>

      <main>
        <SearchBar onSearch={fetchPokemonData} suggestions={allPokemon} />

        {loading && <div className="loading">Loading...</div>}
        {error && <div className="error">{error}</div>}

        {!loading && !error && currentPokemon ? (
          <PokemonCard data={currentPokemon} region={region} />
        ) : (
          !loading && !error && (
            <div style={{ marginTop: '50px', color: '#777', fontSize: '1.5rem' }}>
              Search for a pokemon to see details!
            </div>
          )
        )}
      </main>
    </div>
  );
}

export default App;
