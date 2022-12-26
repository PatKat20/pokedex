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

pokeApi.pokemonIcons = {
    normal:{ 
        img: "../icons/normal.svg",
        colorIcon: "#A0A29F",
    },

    fire: {
        img: "../icons/fire.svg",
        colorIcon: "#FBA54C",
    },

    water:{
        img: "../icons/water.svg",
        colorIcon: "#539DDF",
    } ,

    electric:{
       img: "../icons/electric.svg",
       colorIcon: "#F2D94E",
    },

    grass:{
        img: "../icons/grass.svg",
        colorIcon: "#5FBD58",
    },

    ice:{
        img: "../icons/ice.svg",
        colorIcon: "#75D0C1",
    },

    fighting:{
        img:"../icons/fighting.svg",
        colorIcon: "#D3425F",
    }, 

    poison:{
        img:"../icons/poison.svg",
        colorIcon: "#B763CF",
        
    },

    ground:{
        img: "../icons/ground.svg",
        colorIcon: "#DA7C4D",
        
    }, 

    flying:{
        img: "../icons/flying.svg",
        colorIcon: "#A1BBEC",
        
    }, 

    psychic:{
        img: "../icons/psychic.svg",
        colorIcon: "#FA8581",
        
    }, 

    bug:{
        img: "../icons/bug.svg",
        colorIcon: "#92BC2C",
        
    }, 

    rock:{
        img: "../icons/rock.svg",
        colorIcon: "#C9BB8A",
        
    }, 

    ghost:{
        img: "../icons/ghost.svg",
        colorIcon: "#5F6DBC",
    },

    dragon:{
        img:"../icons/dragon.svg",
        colorIcon: "#0C69C8",
    },

    dark:{
        img:"../icons/dark.svg",
        colorIcon: "#595761",
    },

    steel:{
        img:"../icons/steel.svg",
        colorIcon: "#5695A3",
    },

    fairy:{
        img:"../icons/fairy.svg",
        colorIcon: "#EE90E6",
    },

}

pokeApi.getPokemonDetails = (pokemon) => {
    return fetch(pokemon.url)
        .then(response => response.json())
        .then(pokeApi.convertPokemonJsonToHtml)
}

pokeApi.verifyTypeAndInsert = (type, className) => {
    
    if (type !== undefined) {
        return `<span class="${className}">${type.type.name}</span>`
    } else {
        return `<span></span>`
    }
}

pokeApi.verifyTypeAndInsertImg = (type, className) => {
    if (type !== undefined) { 
        const iconInfo = pokeApi.pokemonIcons[type.type.name]
        return `<img class="${className}" 
                    src="${iconInfo.img}" 
                    style="background-color:${iconInfo.colorIcon}; box-shadow: 0 0 20px ${iconInfo.colorIcon}">
                </img>`
    } else {
        return `<span></span>`
    }
}

pokeApi.convertPokemonJsonToHtml = (pokeInfo) => {
    let [type1, type2] = pokeInfo.types
    const colorInfo = pokeApi.pokemonColor[type1.type.name]

    return `
        <li class="pokeCard" style="background-color:${colorInfo}">
            <a href="https://patkat20.github.io/pokedex/pages/cardPokemon.html?id=${pokeInfo.id}">
                <div class="pokemonContrast">
                    <img src="${pokeInfo.sprites.other.home.front_default}" class="pokeImagem"></img>
                </div>
                    <span class="pokeId">#${pokeInfo.id.toString().padStart(3, '0')}</span>
                    <p class="pokeName">${pokeInfo.name}</p>
                    <div class="pokeTypeArea">
                        <span class="pokeType">${type1.type.name}</span>
                        ${pokeApi.verifyTypeAndInsert(type2, "pokeType", "span")}
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

