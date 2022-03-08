import React, { Fragment } from 'react';
import { FaWeightHanging, FaArrowsAltV, FaBabyCarriage, FaCrown, FaMagic, FaShapes } from 'react-icons/fa';
import { BsGenderAmbiguous, BsTreeFill } from 'react-icons/bs';
import { BiHappy } from 'react-icons/bi';
import { GiFishingNet } from 'react-icons/gi';
import './stats.css';
import { pokedex } from '../utils/pokemon'
import GenderBar from './genderBar';

class Stats extends React.Component {
    constructor(props) {
        super(props);
        this.getStatsTable = this.getStatsTable.bind(this);
    }
    getStatsTable(pokemon) {
        return <Fragment>
            <table className='stats-table'>
                <tbody>
                    <tr>
                        <td><FaWeightHanging /> Weight</td>
                        <td>{`${pokemon.data.weight / 10}kg`}</td>
                    </tr>
                    <tr>
                        <td><FaArrowsAltV /> Height</td>
                        <td>{`${pokemon.data.height * 10}cm`}</td>
                    </tr>
                    <tr>
                        <td><BsGenderAmbiguous /> Gender Rate</td>
                        <td><GenderBar rate={pokemon.data.genderRate} /></td>
                    </tr>
                    <tr>
                        <td><GiFishingNet /> Capture Rate</td>
                        <td>{pokemon.data.captureRate} / 255</td>
                    </tr>
                    <tr>
                        <td><BiHappy /> Base Happiness</td>
                        <td>{pokemon.data.baseHappiness} / 255</td>
                    </tr>
                    <tr>
                        <td><FaBabyCarriage /> Is a baby?</td>
                        <td>{pokemon.data.baby ? 'Yes' : 'No'}</td>
                    </tr>
                    <tr>
                        <td><FaCrown /> Is Legendary?</td>
                        <td>{pokemon.data.legendary ? 'Yes' : 'No'}</td>
                    </tr>
                    <tr>
                        <td><FaMagic /> Is Mythical?</td>
                        <td>{pokemon.data.mythical ? 'Yes' : 'No'}</td>
                    </tr>
                    <tr>
                        <td><BsTreeFill /> Habitat</td>
                        <td>{pokemon.data.habitat ? pokemon.data.habitat[0].toUpperCase() + pokemon.data.habitat.substr(1) : 'No Habitat'}</td>
                    </tr>
                    <tr>
                        <td><FaShapes /> Shape</td>
                        <td>{pokemon.data.shape ? pokemon.data.shape[0].toUpperCase() + pokemon.data.shape.substr(1) : 'No Shape'}</td>
                    </tr>
                </tbody>
            </table>
        </Fragment>
    }
    render() {
        const pokemon = pokedex.getPokemonById(this.props.selected);
        let statsTable = <Fragment />

        if (pokemon) statsTable = this.getStatsTable(pokemon);

        return (
            <div className='stats-box'>
                <div className='stats-container'>
                    <table className='area-split-table'>
                        <thead>
                            <tr>
                                <td className='split-table-cell border-right'>
                                    {statsTable}
                                </td>
                                <td className='split-table-cell'>
                                    
                                </td>
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>
        );
    }
}

export default Stats;