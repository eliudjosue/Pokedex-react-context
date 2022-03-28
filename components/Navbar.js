import React from "react";
import FavoriteContext from "../contex/favoriteContex";

const Navbar = () => {
  const { favoritePokemons } = React.useContext(FavoriteContext);
  // console.log(favoritePokemons)
  let UrlImg =
    "https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png";
  return (
    <div className="navbar-container">
      <img src={UrlImg} alt="logo-imagen" className="navbar-img" />

      <div>
        <span aria-labelledby="heart" role="img">
          💖
        </span>{" "}
        {favoritePokemons.length}
      </div>
    </div>
  );
};

export default Navbar;
