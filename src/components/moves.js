import './moves.css';
import React, { Fragment } from "react";
import { pokedex } from '../utils/pokemon'
import { capitaliseWord, capitaliseAllWords } from '../utils/strings';

class Moves extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            version: ""
        }
        this.dropdownChanged = this.dropdownChanged.bind(this);
        this.getMovesTable = this.getMovesTable.bind(this);
    }
    dropdownChanged(e) {
        const name = e.target.value;
        this.setState({
            version: name
        });
    }
    getMovesTable(pokemon, version) {
        let rows = <Fragment />
        if (version !== undefined && version.length > 0) {
            let set = [...pokemon.data.moveSets[version]];
            set.sort((a, b) => {
                let aLevel = (a.method === "levelup");
                let bLevel = (b.method === "levelup");
                if (aLevel && !bLevel) {
                    return -1;
                }
                else if (bLevel && !aLevel) {
                    return 1;
                }
                else if (a.method > b.method) {
                    return 1;
                } 
                else if (a.method < b.method) { 
                    return -1;
                }
                else if (a.learnedAt < b.learnedAt) { 
                    return -1;
                } 
                else if (a.learnedAt > b.learnedAt) {
                    return 1
                } 
                else { 
                    return 0;
                }
            });
            rows = <Fragment>
                    {set.map((move, index) => {
                        let method = capitaliseWord(move.method);
                        if (move.method === "levelup") {
                            method = `Lvl. ${move.learnedAt}`
                        }
                        return <tr key={`${move.name}|${move.method}`}>
                            <td>
                                {capitaliseAllWords(move.name.replaceAll("-", " "))}
                            </td>
                            <td>
                                {method}
                            </td>
                        </tr>
                    })}
            </Fragment> 
        }
        return  <table className='moves-table'>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
    }
    render() {
        const pokemon = pokedex.getPokemonById(this.props.selected);
        let dropdown = <Fragment />
        let moves = <Fragment />
        if (pokemon) {
            // get every game
            const games = Object.keys(pokemon.data.moveSets);
            dropdown =  <select onChange={this.dropdownChanged} className='game-select'>
                            {games.map((game) => <option key={game} value={game}>{capitaliseAllWords(game.replaceAll("-", " "))}</option>)}
                        </select>

            // get the version
            let version = this.state.version;
            if (!games.includes(version)) {
                if (games.length > 0) {
                    version = games[0];
                }
                else {
                    version = "";
                }
            }

            moves = this.getMovesTable(pokemon, version);
        }
        
        return (
            <div className='moves-box'>
                {dropdown}
                <div className='moves-container'>
                    {moves}
                </div>
            </div>
        );
    }
}

export default Moves;