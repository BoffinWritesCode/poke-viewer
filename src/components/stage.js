import './stage.css';
import React from 'react';
import { pokedex } from '../utils/pokemon';

class Stage extends React.Component {
    #pokemonCount = 0;
    constructor(props) {
        super(props);

        pokedex.addUpdateCallback((pokemon) => {
            pokemonCount++;
            // if the count is less, that means there's extra pokemon that we haven't added to the list yet.
            if (pokemonCount < pokedex.getTotalPokemon()) {

            }
        });
    }
    render() {
        return (
            <div className='stage'>
                <div id='pokemon-list' className='vertical-list'>

                </div>
            </div>
        );
    }
}

export default Stage;