import './pokemonListItem.css';
import React from 'react';

class PokemonListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: false
        };
        this.icon = props.icon;
        this.label = props.label;
        this.id = props.id;
        this.listParent = props.parent;
        this.onClicked = this.onClicked.bind(this);
        this.setSelected = this.setSelected.bind(this);
    }
    onClicked() {
        this.listParent.setSelected(this);
    }
    setSelected(value) {
        this.setState({
            selected: value
        });
    }
    render() {
        const img = this.icon ? <img src={this.icon} /> : "";
        return (
            <div onClick={this.onClicked} className={`pokemon-list-item ${this.state.selected ? 'pokemon-list-item-selected' : ''}`}>
                {img}
                <label className={this.icon ? "" : "pokemon-list-item-no-img"}>{this.label}</label>
            </div>
        );
    }
}

export default PokemonListItem;