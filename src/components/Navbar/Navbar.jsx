import React, { useContext } from 'react'
import FavoriteContext from '../../context/FavoriteContext'




const Navbar = () => { 
  const { favoritePokemons } = useContext(FavoriteContext);

  let imgUrl = 'https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png'
  return (
    <nav>
      <div></div>
      <div>
        <img src={imgUrl}
          className="navbar-image"
        alt="pokeapi-logo"/>
      </div>
      <div>&#10084;&#65039; { favoritePokemons.length }</div>
    </nav>
  )

}
export default Navbar