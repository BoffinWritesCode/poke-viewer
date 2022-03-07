import localforage from "localforage";

const imageUrlPath = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';

class Pokedex {
    callbacks = [];
    dataById = {};
    dataByName = {};
    #count = 0;
    clear() {
        this.dataById = {};
        this.dataByName = {};
        this.#count = 0;
    }
    addUpdateCallback(callback) {
        this.callbacks.push(callback);
    }
    removeUpdateCallback(callback) {
        let index = this.callbacks.findIndex(cb => cb == callback);
        if (index < 0) return;
        this.callbacks = this.callbacks.splice(index, 1);
    }
    addPokemon(pokemon) {
        // pokemon are stored by their id and name.
        this.dataById[pokemon.data.id] = pokemon;
        this.dataByName[pokemon.data.name] = pokemon;
        this.#count++;

        for (const callback of this.callbacks) {
            callback(pokemon);
        }
    }
    getTotalPokemon() {
        return this.#count;
    }
    getPokemonArray() {
        const sorted = Object.keys(this.dataById).map((key) => parseInt(key)).sort();
        return sorted.map((key) => this.dataById[key]);
    }
    getPokemonById(id) {
        return this.dataById[id];
    }
    getPokemonByName(name) {
        return this.dataByName[name];
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
            data.id = parseInt(json.id);
            data.name = json.name[0].toUpperCase() + json.name.substr(1);
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
            data.sprite = (official_art || json.sprites.front_default);
            if (data.sprite) data.sprite = data.sprite.substr(imageUrlPath.length);
            // set the icon to use
            data.icon = json.sprites.front_default;
            if (data.icon) data.icon = data.icon.substr(imageUrlPath.length);
            
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

export var pokedex = new Pokedex();

/*
information to cache:

- name
- id
- height
- weight
- all stats { name, base-value }
- sprite location 

*/

export function getFullUrl(urlPart) { return imageUrlPath + urlPart; }

export async function loadPokemon() {
    pokedex.clear();

    let response = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=2000')
    let json = await response.json();

    // add all the pokemon into the pokedex
    await Promise.all(json.results.map(async (result) => {
        let pokemon = new Pokemon(result.name, result.url);

        await pokemon.loadData();

        pokedex.addPokemon(pokemon);
    }));
}