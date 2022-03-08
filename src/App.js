import React from "react";
import "./app.css";
import Header from "./components/header.js";
import Footer from './components/footer.js';
import PokemonDisplay from "./components/pokemonDisplay.js";
import { loadPokemon } from "./utils/pokemon.js";

/*
Notes:
So the app itself is going to be:
  Navigation bar at the top, just for anything that could be useful.
  This would contain a drop-down menu that allows you to see all the different pokemon
  in order, and pick which one you'd like to look at.
  Will also contain the different "screens"
  => A one-by-one screen, in which you can see all the pokemon in more detail and select them
  by either clicking from a giant list or (on mobile, swiping) (on pc, clicking arrows)
  => A full giant grid containing list of all of them, in short form (picture and name?)
  Clicking on one would take you to the detailed screen.

  Things to consider:
  - Swiping library (there's some Jquery ones, might be useful)
  - Using bootstrap react components for some of the more complex ones.
  - api.js file, for storing all the API based code
  - on page load, immediate async call to load all the pokemon names and their URLs
  - then load all of their information, if possible strip any unnecessary info
*/

class App extends React.Component {
    componentDidMount() {
        loadPokemon();
    }
    render() {
        return (
            <div className="app">
                <Header />
                <PokemonDisplay />
                <Footer />
            </div>
        );
    }
}

export default App;
