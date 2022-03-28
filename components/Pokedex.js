import React from "react";
import Pagination from "./Pagination";
import Pokemoncard from "./Pokemoncard";

const Pokedex = (props) => {
  const { pokemons, page, setPage, total, loading } = props;
  // console.log(pokemons);

  const lastPage = () => {
    const nextPage = Math.max(page - 1, 0);
    setPage(nextPage);
  };

  const nextPage = () => {
    const nextPage = Math.min(page + 1, total);
    setPage(nextPage);
  };

  return (
    <div className="pokedex">
      <div className="pokedex-container">
        <h1>Pokedex</h1>
        <Pagination
          page={page + 1}
          totalPage={total}
          onleftClick={lastPage}
          onRightClick={nextPage}
        />
      </div>
      {loading ? (
        <div>Cargando pokemones...</div>
      ) : (
        <div className="container">
          <div className="row">
            {pokemons.map((pokemon, idx) => {
              return (
                <div className="col-sm-6 col-md-4 col-xs-9">
                  <Pokemoncard pokemon={pokemon} key={pokemon.name} />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Pokedex;
