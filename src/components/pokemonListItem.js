import './pokemonListItem.css';
import React from 'react';

class PokemonListItem extends React.Component {
    constructor(props) {
        super(props);
        this.icon = props.icon;
        this.label = props.label;
        this.id = props.id;
    }
    render() {
        const img = this.icon ? <img src={this.icon} /> : "";
        return (
            <div className={'pokemon-list-item'}>
                {img}
                <label>{this.label}</label>
            </div>
        );
    }
}

export default PokemonListItem;