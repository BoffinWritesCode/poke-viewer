import './pokemonListItem.css';
import React from 'react';
import { getFullUrl } from '../utils/pokemon'

class PokemonListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: false,
            visible: props.visible
        };
        this.icon = props.icon;
        this.label = props.label;
        this.id = props.id;
        this.listParent = props.parent;
        this.onClicked = this.onClicked.bind(this);
        this.setSelected = this.setSelected.bind(this);
        this.mainDivRef = React.createRef();
    }
    onClicked() {
        this.listParent.setSelected(this);
    }
    setSelected(value) {
        let visible = value ? true : !this.mainDivRef.current.classList.contains("display-none");
        this.setState({
            selected: value,
            visible: visible
        });
    }
    render() {
        const img = this.icon ? <img src={getFullUrl(this.icon)} /> : "";
        return (
            <div ref={this.mainDivRef} onClick={this.onClicked} className={`pokemon-list-item ${this.state.selected ? 'pokemon-list-item-selected' : ''} ${this.state.visible ? '' : 'display-none'}`}>
                {img}
                <label className={this.icon ? "" : "pokemon-list-item-no-img"}>{this.label}</label>
            </div>
        );
    }
}

export default PokemonListItem;