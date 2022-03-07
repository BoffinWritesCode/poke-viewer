import './pokemonDisplay.css';
import React from 'react';
import PokemonList from './pokemonList';

class PokemonDisplay extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className='pokemon-display'>
                <PokemonList />
            </div>
        );
    }
}

export default PokemonDisplay;