// Variáveis e Seletores
let actuallyOffset = 0
let limit = 20;

const rightButton = document.querySelector("#rightButton")
const pokeTyepOpc = document.querySelector("#pokeTypeOpc")

// Funções

const insertIntoHtml = (pokemons = []) => {
    const pokeList = document.getElementById("pokeList")
    pokeList.innerHTML = pokemons.join("")
}

function loadPokemons(offset = 0, limit = 20) {
    pokeApi.getPokemons(offset, limit).then(insertIntoHtml)
}

// Eventos
rightButton.addEventListener("click", _ => {
    actuallyOffset += limit;
    loadPokemons(actuallyOffset)
})

leftButton.addEventListener("click", _ => {
    actuallyOffset = actuallyOffset == 0 ? 0 : actuallyOffset - limit;
    loadPokemons(actuallyOffset)
})

loadPokemons(actuallyOffset)