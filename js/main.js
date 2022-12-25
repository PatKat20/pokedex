// Variáveis e Seletores

let url = (offset = 0, limit = 20) => `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
let actuallyOffset = 0
const rightButton = document.querySelector("#rightButton")

// Funções

const insertIntoHtml = (pokemons = []) =>{
    const pokeList = document.getElementById("pokeList")
    pokeList.innerHTML = pokemons.join("")
}

// Eventos

rightButton.addEventListener("click", _ =>{
    actuallyOffset += 20;
    pokeApi.getPokemons(url(actuallyOffset)).then(insertIntoHtml)
})

leftButton.addEventListener("click", _ =>{
    actuallyOffset = actuallyOffset == 0 ? 0 : actuallyOffset -= 20;
    pokeApi.getPokemons(url(actuallyOffset)).then(insertIntoHtml)
})

pokeApi.getPokemons(url()).then(insertIntoHtml)
