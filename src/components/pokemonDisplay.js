import './pokemonDisplay.css';
import React, { createRef } from 'react';
import PokemonList from './pokemonList';
import Stage from './stage';
import Stats from './stats';
import Moves from './moves';

class PokemonDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedId: -1
        };
        this.setSelected = this.setSelected.bind(this);
        this.listRef = React.createRef();
    }
    setSelected(id) {
        this.setState({
            selectedId: id
        });
        // mobile-only
        this.listRef?.current?.forceListDisable();
    }
    toggleList() {
        this.listRef.current?.toggleList();
    }
    render() {
        return (
            <div className='pokemon-display'>
                <Stage selected={this.state.selectedId} display={this} />
                <Stats selected={this.state.selectedId} display={this} />
                <Moves selected={this.state.selectedId} display={this} />
                <PokemonList ref={this.listRef} selected={this.state.selectedId} display={this}/>
            </div>
        );
    }
}

export default PokemonDisplay;