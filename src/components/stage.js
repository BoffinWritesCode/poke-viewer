import './stage.css';
import React from 'react';
import { pokedex, getFullUrl } from '../utils/pokemon';

class Stage extends React.Component {
    constructor(props) {
        super(props);
        this.display = props.display;
    }
    render() {
        console.log("stage: " + this.props.selected);
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
            return (
                <div className="stage">
                    <label>{pokemon.data.name}</label>
                    <div style={style}></div>
                    <button class="stage-left"></button>
                    <button class="stage-right"></button>
                </div>
            );
        }
    }
}

export default Stage;