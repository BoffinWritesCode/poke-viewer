import localforage from "localforage";

const imageUrlPath = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';

class Pokedex {
    callbacks = [];
    dataById = {};
    dataByName = {};
    #highestID = -1;
    #count = 0;
    #toBeLoaded = 0;
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
    runCallbacks(pokemon) {
        for (const callback of this.callbacks) {
            callback(pokemon);
        }
    }
    addPokemon(pokemon) {
        // pokemon are stored by their id and name.
        this.dataById[pokemon.data.id] = pokemon;
        if (pokemon.data.id > this.#highestID) {
            this.#highestID = pokemon.data.id;
        }
        this.dataByName[pokemon.data.name] = pokemon;
        this.#count++;

        this.runCallbacks(pokemon);
    }
    setPokemonToBeLoaded(count) {
        this.#toBeLoaded = count;
    }
    getPokemonToBeLoaded() {
        return this.#toBeLoaded;
    }
    getTotalPokemon() {
        return this.#count;
    }
    getMaxID() {
        return this.#highestID;
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
            data.sprite = (official_art || json.sprites.front_default || json.sprites.other?.home?.front_default || json.sprites.versions?.["generation-vii"]?.["ultra-sun-ultra-moon"]?.front_default);
            if (data.sprite) data.sprite = data.sprite.substr(imageUrlPath.length);
            else {
                return false;
            }
            // set the icon to use
            data.icon = json.sprites.front_default;
            if (data.icon) data.icon = data.icon.substr(imageUrlPath.length);

            data.types = [];
            for (const type of json.types) {
                data.types.push(type.type.name);
            }

            data.moveSets = {};
            // moves are objects:
            // { game_version_group: 'diamond-pearl', moves: [
            //  { name: "tackle", learnt_at: 0}
            //]}
            for (const move of json.moves) {
                for (const versionGroup of move.version_group_details) {
                    let name = versionGroup.version_group.name;
                    if (!(name in data.moveSets)) {
                        data.moveSets[name] = [];
                    }

                    data.moveSets[name].push({ 
                        name: move.move.name,
                        method: versionGroup.move_learn_method.name.replace('-', ''),
                        learnedAt: versionGroup.level_learned_at
                    });
                }
            }

            if (json.species?.url) {
                let speciesResponse = await fetch(json.species.url)
                let speciesJson = await speciesResponse.json();

                data.genderRate = speciesJson.gender_rate;
                data.captureRate = speciesJson.capture_rate;
                data.baseHappiness = speciesJson.base_happiness;
                data.baby = speciesJson.is_baby;
                data.legendary = speciesJson.is_legendary;
                data.mythical = speciesJson.is_mythical;
                data.habitat = speciesJson.habitat?.name;
                data.shape = speciesJson.shape?.name;
            }

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
        return true;
    }
}

export var pokedex = new Pokedex();

export const typeColorDictionary = {
    "normal": "#ADA594",
    "fire": "#F75231",
    "water": "#399CFF",
    "electric": "#FFC631",
    "grass": "#7BCE52",
    "ice": "#5ACEE7",
    "fight": "#A55239",
    "poison": "#B55AA5",
    "ground": "#D6B55A",
    "flying": "#9CADF7",
    "psychic": "#FF73A5",
    "bug": "#ADBD21",
    "rock": "#BDA55A",
    "ghost": "#6363B5",
    "dragon": "#7B63E7",
    "steel": "#ADADC6",
    "dark": "#735A4A",
    "fairy": "#F7B5F7"
}
/*
information to cache:

- name
- id
- height
- weight
- all stats { name, base-value }
- sprite location 

*/

function getAllValuesInObj(obj) {
    let result = [];
    for (const i in obj) {
        // if it's an object that's not an array
        if (!Array.isArray(obj[i]) && (typeof obj[i]) === 'object') {
            const array = getAllValuesInObj(obj[i]);
            for (const j in array) {
                result.push(array[j]);
            }
        }
        else {
            result.push(obj[i]);
        }
    }
    return result;
};

export function getFullUrl(urlPart) { return imageUrlPath + urlPart; }

export async function loadPokemon() {
    pokedex.clear();

    //localforage.clear();

    let response = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=3000')
    let json = await response.json();

    pokedex.setPokemonToBeLoaded(json.results.length);

    // add all the pokemon into the pokedex
    await Promise.all(json.results.map(async (result) => {
        let pokemon = new Pokemon(result.name, result.url);

        let shouldAdd = await pokemon.loadData();

        if (shouldAdd) pokedex.addPokemon(pokemon);
        else {
            pokedex.setPokemonToBeLoaded(pokedex.getPokemonToBeLoaded() - 1);
            pokedex.runCallbacks(undefined);
        }
    }));
}