import './footer.css';
import React from 'react';
import { pokedex } from '../utils/pokemon';

class Footer extends React.Component {
    #callback;
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        this.#callback = (pokemon) => {
            this.setState({});
        }

        pokedex.addUpdateCallback(this.#callback);
    }
    componentWillUnmount() {
        pokedex.removeUpdateCallback(this.#callback);
    }
    render() {
        return (
            <div className="footer">
                <div className='footer-text progress-text'>Loaded {pokedex.getTotalPokemon()} out of {pokedex.getPokemonToBeLoaded()}</div>
                <div className='footer-text disclaimer'>Created by <a href="https://github.com/BoffinWritesCode">@BoffinWritesCode</a>. Pokémon and Pokémon character names are trademarks of Nintendo.</div>
            </div>
        );
    }
}

export default Footer;