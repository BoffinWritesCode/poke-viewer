import './pokemonListItem.css';
import React from 'react';
import { getFullUrl } from '../utils/pokemon'

class PokemonListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: true,
            selected: false
        };
        this.icon = props.icon;
        this.label = props.label;
        this.id = props.id;
        this.display = props.display;
        this.onClicked = this.onClicked.bind(this);
        this.setSelected = this.setSelected.bind(this);
        this.mainDivRef = React.createRef();
    }
    onClicked() {
        this.display.setSelected(this.id);
    }
    setSelected(selected) {
        this.setState((prevState, props) => ({
            visible: prevState.visible,
            selected: selected
        }));
    }
    render() {
        const img = this.icon ? <img src={getFullUrl(this.icon)} /> : "";
        return (
            <div ref={this.mainDivRef} onClick={this.onClicked} className={`pokemon-list-item ${this.props.selected ? 'pokemon-list-item-selected' : ''} ${this.props.visible ? '' : 'display-none'}`}>
                {img}
                <label className={this.icon ? "" : "pokemon-list-item-no-img"}>{this.label}</label>
            </div>
        );
    }
}

export default PokemonListItem;