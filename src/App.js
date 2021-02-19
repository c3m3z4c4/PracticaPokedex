import { useState, useEffect } from 'react'
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Searchbar from './components/SearchBar';
import Pokedex from './components/Pokedex';
import { getPokemonData, getPokemons } from './api';
import { FavoriteProvider } from './context/FavoriteContext';




function App() {
  const [pokemons, setPokemons] = useState([]);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);



  const fetchPokemons = async () => { 
    try {
      setLoading(true);
      const data = await getPokemons(15, 15 * page);
      const promises = data.results.map( async (pokemon) => { 
        return await getPokemonData(pokemon.url)
      })
      const results = await Promise.all(promises)
      setPokemons(results)
      setLoading(false)
      setTotal(Math.ceil(data.count/15))
    } catch (error) {
      
    }
  }


  useEffect(() => {
    fetchPokemons();
  }, [page]);


  const updateFavoritePokemons = (name) => { 
    const updated = [...favorites]
    const isFavorite = updated.indexOf(name);
    if (isFavorite >= 0) {
      updated.splice(isFavorite, 1)
    } else { 
      updated.push(name);
    }
    setFavorites(updated)
  }

  return (
    <FavoriteProvider value={{ favoritePokemons: favorites, updateFavoritePokemons: updateFavoritePokemons }} >
      <div>
        <Navbar />
        <div className="App">
          <Searchbar />
          {
              <Pokedex
                loading={ loading }
                pokemons={pokemons}
                page={page}
                setPage={setPage}
                total={ total }
              />
            }
          </div>
      </div>
    </FavoriteProvider>
  );
}

export default App;
