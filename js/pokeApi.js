const pokeApi = {}
pokeApi.url = (offset = 0, limit = 20) => `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

pokeApi.pokemonColor = {
    normal: "#A8A77A",
    fire: "#EE8130",
    water: "#6390F0",
    electric: "#F7D02C",
    grass: "#7AC74C",
    ice: "#96D9D6",
    fighting: "#C22E28",
    poison: "#A33EA1",
    ground: "#E2BF65",
    flying: "#A98FF3",
    psychic: "#F95587",
    bug: "#A6B91A",
    rock: "#B6A136",
    ghost: "#735797",
    dragon: "#6F35FC",
    dark: "#705746",
    steel: "#B7B7CE",
    fairy: "#D685AD",
}

pokeApi.getPokemonDetails = (pokemon) => {
    return fetch(pokemon.url)
        .then(response => response.json())
        .then(pokeApi.convertPokemonJsonToHtml)
}

pokeApi.verifyTypeAndInsert = (type, className) =>{
    if(type !== undefined){
      return `<span class="${className}">${type.type.name}</span>`
    } else {
        return `<span></span>`
    }
}

pokeApi.convertPokemonJsonToHtml = (pokeInfo) => {
    let [type1, type2] = pokeInfo.types

    return `
        <li class="pokeCard" style="background-color:${pokeApi.pokemonColor[type1.type.name]}">
            <a href="../cardPokemon.html?id=${pokeInfo.id}">
                <div class="pokemonContrast">
                    <img src="${pokeInfo.sprites.other.home.front_default}" class="pokeImagem"></img>
                </div>
                    <span class="pokeId">#${pokeInfo.id.toString().padStart(3, '0')}</span>
                    <p class="pokeName">${pokeInfo.name}</p>
                    <div class="pokeTypeArea">
                        <span class="pokeType">${type1.type.name}</span>
                        ${pokeApi.verifyTypeAndInsert(type2, "pokeType")}
                    </div>
            </a>
        </li>
    `
}

pokeApi.getPokemons = (offset, limit) => {
    return fetch(pokeApi.url(offset, limit))
        .then(response => response.json())
        .then(jsonBody => jsonBody.results)
        .then(pokemonList => pokemonList.map(pokeApi.getPokemonDetails))
        .then(pokemonDetails => Promise.all(pokemonDetails))
}

