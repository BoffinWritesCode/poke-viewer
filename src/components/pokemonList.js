import './pokemonList.css';
import React, { Fragment, memo } from 'react';
import { pokedex } from '../utils/pokemon.js';
import { VerticalList } from './lists';
import PokemonListItem from './pokemonListItem';
import SearchBar from './searchBar';
import { GiAllSeeingEye } from 'react-icons/gi';

class PokemonList extends React.Component {
    #callback;
    #currentSearch;
    pokemon = [];
    listItems = []
    constructor(props) {
        super(props);
        this.display = props.display;
        this.searchBarUpdated = this.searchBarUpdated.bind(this);
        this.updateList = this.updateList.bind(this);
        this.toggleList = this.toggleList.bind(this);
        this.forceListDisable = this.forceListDisable.bind(this);
        this.listRef = React.createRef();
        this.divRef = React.createRef();
    }
    searchBarUpdated(search) {
        this.#currentSearch = search.toLowerCase();
        
        // loop through all child elements, remove/add display-none class based on whether they match the search
        const list = this.listRef.current;
        for (let i = 0; i < list.children.length; i++) {
            let visible = this.pokemon[i].ref_name.indexOf(this.#currentSearch) !== -1;
            if (!visible) list.children[i].classList.add("display-none");
            else list.children[i].classList.remove("display-none");
        }
    }
    toggleList() {
        const element = this.divRef.current;
        if (element.classList.contains('selected')) {
            element.classList.remove('selected');
        }
        else {
            element.classList.add('selected');
        }
    }
    forceListDisable() {
        const element = this.divRef.current;
        if (element.classList.contains('selected')) {
            element.classList.remove('selected');
        }
    }
    updateList() {
        this.setState({
            values: this.pokemon
        });
    }
    generateItem(pokemon, selected) {
        let visible = this.#currentSearch ? pokemon.ref_name.indexOf(this.#currentSearch) !== -1 : true;
        return <PokemonListItem selected={selected} visible={visible} key={pokemon.ref_name} display={this.display} id={pokemon.data.id} icon={pokemon.data.icon} label={pokemon.data.name} stylingClass="pokemon-list-item" />;
    }
    componentDidMount() {
        // dont add callback if it's already been added
        if (this.#callback) return;

        this.#callback = (pokemon) => {
        
            if (pokemon === undefined) return;

            // find the first index at which the new id is less, and insert it at that point in the list.
            let i = 0;
            let spliced = false;
            while (i < this.pokemon.length) {
                if (pokemon.data.id < this.pokemon[i].data.id) {
                    this.pokemon.splice(i, 0, pokemon);
                    this.listItems.splice(i, 0, this.generateItem(pokemon, false));
                    spliced = true;
                    break;
                }
                i++;
            }
            if (!spliced) {
                this.pokemon.push(pokemon);
                this.listItems.push(this.generateItem(pokemon, false));
            }

            this.updateList();
        };

        // add a callback so that the list updates every time the list of pokemon updates
        pokedex.addUpdateCallback(this.#callback);
    }
    componentWillUnmount() {
        pokedex.removeUpdateCallback(this.#callback);
        this.#callback = undefined;
    }
    componentDidUpdate(props) {
        // if our selected value changed, generate new item in our cached array and re-render
        if (this.props.selected != props.selected) {
            for (let i = 0; i < this.listItems.length; i++) {
                if (this.pokemon[i].data.id === props.selected) {
                    this.listItems[i] = this.generateItem(this.pokemon[i], false);
                }
                else if (this.pokemon[i].data.id === this.props.selected) {
                    this.listItems[i] = this.generateItem(this.pokemon[i], true);
                }
            }
            this.setState({});
        }
    }
    render() {
        return (
            <div ref={this.divRef} id="pokemon-list" >
                <div id="pokemon-list-search-area">
                    <SearchBar inputCallback={this.searchBarUpdated}/>
                </div>
                <VerticalList ref={this.listRef} values={this.listItems}/>
            </div>
        );
    }
}

export default PokemonList;