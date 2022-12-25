const pokeApi = {}

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

const btnEnviar = document.querySelector(".btn-enviar")



pokeApi.getPokemonDetails = (pokemon) => {
    return fetch(pokemon.url)
        .then(response => response.json())
        .then(pokeApi.convertPokemonJsonToHtml)
}

pokeApi.convertPokemonJsonToHtml = (pokeInfo) => {
    const [{ type }] = pokeInfo.types
        
    return `
        <li class="pokeCard" style="background-color:${pokeApi.pokemonColor[type.name]}">
        <div class="pokemonContrast">
            <img src="${pokeInfo.sprites.other.home.front_default}" class="pokeImagem"></img>
        </div>
            <span class="pokeId">#${pokeInfo.id.toString().padStart(3, '0')}</span>
            <p class="pokeName">${pokeInfo.name}</p>
            <span class="pokeType">${type.name}</span>
        </li>
    `

}

pokeApi.getPokemons = (url) => {
    return fetch(url)
        .then(response => response.json())
        .then(jsonBody => jsonBody.results)
        .then(pokemonList => pokemonList.map(pokeApi.getPokemonDetails))
        .then(pokemonDetails => Promise.all(pokemonDetails))
}

