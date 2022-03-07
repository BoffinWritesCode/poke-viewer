import './pokemonList.css';
import React, { Fragment, memo } from 'react';
import { pokedex } from '../utils/pokemon.js';
import { VerticalList } from './lists';
import PokemonListItem from './pokemonListItem';
import SearchBar from './searchBar';

class PokemonList extends React.Component {
    #callback;
    #selectedChild;
    #currentSearch;
    values = [];
    constructor(props) {
        super(props);
        this.state = {
            values: []
        };
        this.display = props.display;
        this.clearSelected = this.clearSelected.bind(this);
        this.setSelected = this.setSelected.bind(this);
        this.searchBarUpdated = this.searchBarUpdated.bind(this);
        this.updateList = this.updateList.bind(this);
        this.listRef = React.createRef();
    }
    clearSelected() {
        this.#selectedChild = undefined;
    }
    setSelected(child) {
        if (this.#selectedChild) {
            this.#selectedChild.setSelected(false);
        }
        this.#selectedChild = child;
        this.display.setSelected(child.id);
        this.#selectedChild.setSelected(true);
    }
    searchBarUpdated(search) {
        this.#currentSearch = search.toLowerCase();
        
        // loop through all child elements, remove/add display-none class based on whether they match the search
        const list = this.listRef.current;
        for (let i = 0; i < list.children.length; i++) {
            let visible = this.values[i].key.indexOf(this.#currentSearch) !== -1;
            if (!visible) list.children[i].classList.add("display-none");
            else list.children[i].classList.remove("display-none");
        }
    }
    updateList() {
        this.setState({
            values: this.values
        });
    }
    componentDidMount() {
        // dont add callback if it's already been added
        if (this.#callback) return;

        this.#callback = (pokemon) => {
            // create a new list item
            let visible = this.#currentSearch ? pokemon.ref_name.indexOf(this.#currentSearch) !== -1 : true;
            const newBox = <PokemonListItem visible={visible} key={pokemon.ref_name} parent={this} id={pokemon.data.id} icon={pokemon.data.icon} label={pokemon.data.name} stylingClass="pokemon-list-item" />;
            
            // find the first index at which the new id is less, and insert it at that point in the list.
            let i = 0;
            while (i < this.values.length) {
                if (pokemon.data.id < this.values[i].props.id) {
                    this.values.splice(i, 0, newBox);
                    break;
                }
                i++;
            }
            if (i == this.values.length) {
                this.values.push(newBox);
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
    render() {
        return (
            <div id="pokemon-list" >
                <div id="pokemon-list-search-area">
                    <SearchBar inputCallback={this.searchBarUpdated}/>
                </div>
                <VerticalList ref={this.listRef} values={this.state.values}/>
            </div>
        );
    }
}

export default PokemonList;