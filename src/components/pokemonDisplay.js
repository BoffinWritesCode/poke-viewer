import './pokemonDisplay.css';
import React, { createRef } from 'react';
import PokemonList from './pokemonList';
import Stage from './stage';

class PokemonDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedId: -1
        };
        this.setSelected = this.setSelected.bind(this);
    }
    setSelected(id) {
        this.setState({
            selectedId: id
        });
    }
    render() {
        return (
            <div className='pokemon-display'>
                <PokemonList selected={this.state.selectedId} display={this}/>
                <Stage selected={this.state.selectedId} display={this}/>
            </div>
        );
    }
}

export default PokemonDisplay;