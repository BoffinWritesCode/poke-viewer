import './pokemonList.css';
import React from 'react';
import { pokedex } from '../utils/pokemon.js';
import { VerticalList } from './lists';
import PokemonListItem from './pokemonListItem';

class PokemonList extends React.Component {
    #callback;
    values = [];
    constructor(props) {
        super(props);

        this.state = {
            values: []
        };
    }
    componentDidMount() {
        // dont add callback if it's already been added
        if (this.#callback) return;

        this.#callback = (pokemon) => {
            this.values.push(
                <PokemonListItem key={pokemon.ref_name} id={pokemon.data.id} icon={pokemon.data.icon} label={pokemon.data.name} stylingClass="pokemon-list-item" />
            );
            this.values.sort((a, b) => a.props.id - b.props.id);
            this.setState({
                values: this.values
            });
        };
        // add a callback so that the list updates every time the list of pokemon updates
        pokedex.addUpdateCallback(this.#callback);
    }
    componentWillUnmount() {
        pokedex.removeUpdateCallback(this.#callback);
        this.#callback = undefined;
    }
    render() {
        return (
            <VerticalList id="pokemon-list" values={this.state.values}/>
        );
    }
}

export default PokemonList;