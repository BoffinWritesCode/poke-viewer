import React, { Fragment } from 'react';
import { FaWeightHanging, FaArrowsAltV, FaBabyCarriage, FaCrown, FaMagic, FaShapes } from 'react-icons/fa';
import { BsGenderAmbiguous, BsTreeFill, BsTagFill, BsTagsFill, BsBarChartFill } from 'react-icons/bs';
import { BiHappy } from 'react-icons/bi';
import { GiFishingNet } from 'react-icons/gi';
import './stats.css';
import { pokedex, typeColorDictionary } from '../utils/pokemon'
import GenderBar from './genderBar';

class Stats extends React.Component {
    constructor(props) {
        super(props);
        this.getStatsTable = this.getStatsTable.bind(this);
    }
    getStatsTable(pokemon) {
        const genderRatio = pokemon.data.genderRate !== undefined ? <GenderBar rate={pokemon.data.genderRate} /> : <Fragment />;
        const captureRate = pokemon.data.captureRate !== undefined ? <Fragment>{pokemon.data.captureRate} / 255</Fragment> : <Fragment />;
        const baseHappiness = pokemon.data.baseHappiness !== undefined ? <Fragment>{pokemon.data.baseHappiness} / 255</Fragment> : <Fragment />;
        const isBaby = pokemon.data.baby !== undefined ? <Fragment>{pokemon.data.baby ? 'Yes' : 'No'}</Fragment> : <Fragment />;
        const isLegendary = pokemon.data.legendary !== undefined ? <Fragment>{pokemon.data.legendary ? 'Yes' : 'No'}</Fragment> : <Fragment />;
        const isMythical = pokemon.data.mythical !== undefined ? <Fragment>{pokemon.data.mythical ? 'Yes' : 'No'}</Fragment> : <Fragment />;
        const habitat = <Fragment>{pokemon.data.habitat ? pokemon.data.habitat[0].toUpperCase() + pokemon.data.habitat.substr(1) : 'No Habitat'}</Fragment>;
        const shape = <Fragment>{pokemon.data.shape ? pokemon.data.shape[0].toUpperCase() + pokemon.data.shape.substr(1) : 'No Shape'}</Fragment>;
        return <Fragment>
            <table className='stats-table'>
                <tbody>
                    <tr key="name">
                        <td><BsTagFill /> Name</td>
                        <td>{pokemon.data.name[0].toUpperCase() + pokemon.data.name.substr(1)}</td>
                    </tr>
                    <tr key="types">
                        <td><BsTagsFill /> Types</td>
                        <td>{pokemon.data.types.map((type) => <div key={type} className="type-box" style={{backgroundColor: typeColorDictionary[type]}}>{type}</div>)}</td>
                    </tr>
                    <tr key="stats">
                        <td><BsBarChartFill /> Base Stats</td>
                        <td>
                            <table className='base-stats-table'>
                                <tbody>
                                    {
                                        pokemon.data.stats.map((stat) => {
                                            return <tr key={stat.name}>
                                                <td>
                                                    {stat.name[0].toUpperCase() + stat.name.substr(1)}
                                                </td>
                                                <td>
                                                    {stat.base_value}
                                                </td>
                                            </tr>
                                        })
                                    }
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    <tr key="gender">
                        <td><BsGenderAmbiguous /> Gender Ratio</td>
                        <td>{genderRatio}</td>
                    </tr>
                    <tr key="capture">
                        <td><GiFishingNet /> Capture Rate</td>
                        <td>{captureRate}</td>
                    </tr>
                    <tr key="happiness">
                        <td><BiHappy /> Base Happiness</td>
                        <td>{baseHappiness}</td>
                    </tr>
                    <tr key="baby">
                        <td><FaBabyCarriage /> Is a Baby?</td>
                        <td>{isBaby}</td>
                    </tr>
                    <tr key="legendary">
                        <td><FaCrown /> Is Legendary?</td>
                        <td>{isLegendary}</td>
                    </tr>
                    <tr key="mythical">
                        <td><FaMagic /> Is Mythical?</td>
                        <td>{isMythical}</td>
                    </tr>
                    <tr key="weight">
                        <td><FaWeightHanging /> Weight</td>
                        <td>{`${pokemon.data.weight / 10}kg`}</td>
                    </tr>
                    <tr key="height">
                        <td><FaArrowsAltV /> Height</td>
                        <td>{`${pokemon.data.height * 10}cm`}</td>
                    </tr>
                    <tr key="habitat">
                        <td><BsTreeFill /> Habitat</td>
                        <td>{habitat}</td>
                    </tr>
                    <tr key="shape">
                        <td><FaShapes /> Shape</td>
                        <td>{shape}</td>
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
                    {statsTable}
                </div>
            </div>
        );
    }
}

export default Stats;