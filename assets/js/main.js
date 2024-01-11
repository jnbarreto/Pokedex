const pokemonList = document.getElementById("pokemonList")
const loadMoreBtn = document.getElementById("loadMoreBtn")

const maxRecords = 151
const limit = 12
let offset = 0

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
      const newHtml = pokemons.map((pokemon) => `
        <li class="pokemon ${pokemon.type}">
          <span class="number">#${pokemon.number}</span>
          <span class="name">${pokemon.name}</span>

          <div class="detail">
            <ol class="types">
              ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join("")}
            </ol>
            <img src="${pokemon.img}" alt="${pokemon.name}">
          </div>

          <div class="loadDetail">
            <a class="loadDetailBtn ${pokemon.type}"
            href="pokemonDetails.html?id=${pokemon.number}&type=${pokemon.type}">detail</a>
          </div>
        </li>
      `).join("")

      pokemonList.innerHTML += newHtml
    })

}

loadPokemonItens(offset, limit)
loadMoreBtn.addEventListener('click', () => {
  offset += limit

  const qtdRecordsNextPage = offset + limit
  if (qtdRecordsNextPage >= maxRecords) {
    const newLimit = maxRecords - offset
    loadPokemonItens(offset, newLimit)

    loadMoreBtn.parentElement.removeChild(loadMoreBtn)
  } else {
    loadPokemonItens(offset, limit)
  }
})
