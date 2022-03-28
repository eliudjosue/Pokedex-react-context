import "./styles.css";
import React from "react";
import Navbar from "../components/Navbar";
import Searcbar from "../components/Searchbar";
import Pokedex from "../components/Pokedex";
import { getPokemon, getPokemons, searchPokemon } from "../src/api";
import { FavoriteProvider } from "../contex/favoriteContex";

const localStorageKey = "favorite_pokemon";

export default function App() {
  const [pokemons, setPokemons] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [total, setTotal] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const [favorites, setFavorites] = React.useState([]);
  const [notFound, setNotFound] = React.useState(false);
  const [searching, setSearching] = React.useState(false);

  const fetchPokemons = async () => {
    try {
      setLoading(true);
      const data = await getPokemons(20, 20 * page);

      const promises = data.results.map(async (pokemon) => {
        return await getPokemon(pokemon.url);
      });
      const results = await Promise.all(promises);
      setPokemons(results);
      setLoading(false);
      setTotal(Math.ceil(data.count / 20));
      setNotFound(false);
    } catch (error) {}
  };

  const loadFavoritePokemons = () => {
    const pokemons =
      JSON.parse(window.localStorage.getItem(localStorageKey)) || [];
    setFavorites(pokemons);
  };

  React.useEffect(() => {
    loadFavoritePokemons();
  }, []);

  React.useEffect(() => {
    if (!searching) {
      fetchPokemons();
    }
  }, [page]);

  const updateFavoritePokemons = (name) => {
    const update = [...favorites];
    const isFavorite = update.indexOf(name);
    if (isFavorite >= 0) {
      update.splice(isFavorite, 1);
    } else {
      update.push(name);
    }
    setFavorites(update);
    window.localStorage.setItem(localStorageKey, JSON.stringify(update));
  };

  const onSearch = async (pokemon) => {
    if (!pokemon) {
      return fetchPokemons();
    }
    setLoading(true);
    setNotFound(false);
    setSearching(true);
    const result = await searchPokemon(pokemon);
    if (!result) {
      setNotFound(true);
      setLoading(false);
      return;
    } else {
      setPokemons([result]);
      setPage(0);
      setTotal(1);
    }
    setLoading(false);
    setSearching(false);
  };

  return (
    <FavoriteProvider
      value={{
        favoritePokemons: favorites,
        updateFavoritePokemons
      }}
    >
      <div className="App container">
        <Navbar />
        <Searcbar onSearch={onSearch} />
        {notFound ? (
          <div className="not-found-text">
           <span role="img" aria-labelledby="emoji">No se encontro pokemon que buscabas 😢</span> 
           
          </div>
        ) : (
          <Pokedex
            pokemons={pokemons}
            page={page}
            setPage={setPage}
            total={total}
            loading={loading}
          />
        )}
      </div>
    </FavoriteProvider>
  );
}
