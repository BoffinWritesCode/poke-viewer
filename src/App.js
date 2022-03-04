import './app.css';
import NavBar from './navbar.js';

/*
Notes:
So the app itself is going to be:

- Navigation bar at the top, just for anything that could be useful.
  This would contain a drop-down menu that allows you to see all the different pokemon
  in order, and pick which one you'd like to look at.
- The main UI in the center. I'd like to design it so the UI looks like a pokemon card,
  and switching to a new pokemon moves the card to the side, bringing the new card in.
- Arrows on the left and right, that allow you to view the pokemon one above or below
  in the pokedex.
*/

function App() {
  return (
    <div className="app">
        <NavBar />
    </div>
  );
}

export default App;
