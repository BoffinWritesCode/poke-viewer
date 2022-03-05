import localforage from "localforage";

class Pokedex {
    addPokemon(pokemon) {
        if (!this.data) this.data = [];

        this.data.push(pokemon);
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

var pokedex = new Pokedex();

/*
information to cache:

- name
- id
- height
- weight
- all stats { name, base-value }
- sprite location 

*/

export async function loadPokemon() {
    let response = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=2000')
    let json = await response.json();

    // add all the pokemon into the pokedex
    await Promise.all(json.results.map(async (result) => {
        let pokemon = new Pokemon(result.name, result.url);

        await pokemon.loadData();

        pokedex.addPokemon(pokemon);
    }));

    console.log(pokedex);
}