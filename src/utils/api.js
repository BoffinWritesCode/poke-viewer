import localForage from "localforage";

class Pokemon {
    constructor(name, url) {
        
    }
}

export function loadPokemon() {
    localForage.setItem("help", "yes").then((value) => {
        console.log(value);
    });
}