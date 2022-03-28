import React from "react";
import FavoriteContext from "../contex/favoriteContex";

const Pokemoncard = (props) => {
  const { favoritePokemons, updateFavoritePokemons } = React.useContext(
    FavoriteContext
  );
  const { pokemon } = props;
  const redHeart = "❤️";
  const blackHeart = "🖤";
  const heart = favoritePokemons.includes(pokemon.name) ? redHeart : blackHeart;

  const clickHeart = (e) => {
    e.preventDefault();
    updateFavoritePokemons(pokemon.name);
  };

  return (
    <div>
      <div className="pokecard-container container">
        <div className="img-pokecard">
          <img src={pokemon.sprites.front_default} alt="" />
        </div>

        <div className="pokecard">
          <div className="pokecard-name">
            <h3>{pokemon.name}</h3>
            <div> #: {pokemon.id}</div>
          </div>

          <div className="pokecard-skill">
            <div className="pokemon-type">
              {pokemon.types.map((type, idx) => {
                return (
                  <div className="pokemon-type-text" key={idx}>
                    {" "}
                    {type.type.name}{" "}
                  </div>
                );
              })}
            </div>
            <button onClick={clickHeart} className="btn">
              {heart}
            </button>
          </div>
        </div>
    </div>
    </div>
    
  );
};

export default Pokemoncard;
