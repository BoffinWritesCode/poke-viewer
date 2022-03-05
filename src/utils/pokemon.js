import localforage from "localforage";
import ReactDOM from 'react-dom';

class Pokedex {
    callbacks = [];
    dataById = {};
    dataByName = {};
    #count = 0;
    addUpdateCallback(callback) {
        this.callbacks.push(callback);
    }
    addPokemon(pokemon) {
        // pokemon are stored by their id and name.
        this.data[pokemon.data.id] = pokemon;
        this.data[pokemon.data.name] = pokemon;
        this.#count++;

        for (const callback of this.callbacks) {
            callback(pokemon);
        }
    }
    getTotalPokemon() {
        return this.#count;
    }
    getPokemonById(id) {
        return this.data[id];
    }
    getPokemonByName(name) {
        return this.data[name];
    }
}

class Pokemon {
    constructor(name, url) {
        this.ref_name = name;
        this.url = url;
    }
    async loadData() {
        const stored = await localforage.getItem(this.ref_name);
        let data = {};
        if (stored == null) {
            // load the pokemon from pokeapi
            let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${this.ref_name}`)
            let json = await response.json();

            // get the basic info
            data.height = json.height;
            data.weight = json.weight;
            data.id = json.id;
            data.name = json.name;
            // get all stats
            data.stats = [];
            for (const stat of json.stats) {
                data.stats.push({
                    base_value: stat.base_stat,
                    name: stat.stat.name
                });
            }
            // get the sprite, aim for official art if it exists, otherwise game art
            let official_art = json.sprites.other?.["official-artwork"]?.front_default;
            data.sprite = official_art || json.sprites["front-default"];
            
            localforage.setItem(this.ref_name, data, (value) => {
            }).catch((reason) => {
                console.log("failed to cache pokemon data for pokemon.");
                console.log(data);
            });
        }
        else {
            data = stored;
        }

        this.data = data;
    }
}

export var pokedex;

/*
information to cache:

- name
- id
- height
- weight
- all stats { name, base-value }
- sprite location 

*/

export async function loadAndDisplayPokemon() {
    pokedex = new Pokedex();

    let response = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=2000')
    let json = await response.json();

    // add all the pokemon into the pokedex
    await Promise.all(json.results.map(async (result) => {
        let pokemon = new Pokemon(result.name, result.url);

        await pokemon.loadData();

        pokedex.addPokemon(pokemon);
    }));
}