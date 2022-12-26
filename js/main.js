// Variáveis e Seletores
let actuallyOffset = 0
const rightButton = document.querySelector("#rightButton")

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
    actuallyOffset += 20;
    loadPokemons(actuallyOffset)
})

leftButton.addEventListener("click", _ => {
    actuallyOffset = actuallyOffset == 0 ? 0 : actuallyOffset - 20;
    loadPokemons(actuallyOffset)
})

loadPokemons()