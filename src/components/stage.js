import './stage.css';
import React from 'react';
import PokemonList from './pokemonList';

class Stage extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className='stage'>
                <PokemonList />
            </div>
        );
    }
}

export default Stage;