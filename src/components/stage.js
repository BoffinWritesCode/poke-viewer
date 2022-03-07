import './stage.css';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import React from 'react';
import { pokedex, getFullUrl } from '../utils/pokemon';

class Stage extends React.Component {
    constructor(props) {
        super(props);
        this.display = props.display;
        this.nextPokemon = this.nextPokemon.bind(this);
        this.prevPokemon = this.prevPokemon.bind(this);
    }
    nextPokemon() {
        this.display.setSelected(this.display.state.selectedId + 1);
    }
    prevPokemon() {
        this.display.setSelected(this.display.state.selectedId - 1);
    }
    render() {
        if (this.props.selected < 1) {
            return (
                <div className="stage">
                    <div></div>
                </div>
            );
        }
        else {
            const pokemon = pokedex.getPokemonById(this.props.selected);
            const imageUrl = getFullUrl(pokemon.data.sprite);
            const style = {
                backgroundImage: `url("${imageUrl}")`
            }
            const buttonLeft = this.props.selected > 1 ? <button onClick={this.prevPokemon} className="stage-arrow stage-left"><FaArrowLeft /></button> : "";
            const buttonRight = this.props.selected < pokedex.getMaxID() ? <button onClick={this.nextPokemon} className="stage-arrow stage-right"><FaArrowRight /></button> : "";
            return (
                <div className="stage">
                    <label>{pokemon.data.name}</label>
                    <div style={style}></div>
                    {buttonLeft}
                    {buttonRight}
                </div>
            );
        }
    }
}

export default Stage;