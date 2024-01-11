const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
  const pokemon = new Pokemon()
  pokemon.number = pokeDetail.id
  pokemon.name = pokeDetail.name

  const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
  const [type] = types

  pokemon.types = types
  pokemon.type = type

  pokemon.img = pokeDetail.sprites.other.dream_world.front_default

  return pokemon
}

function convertPokeApiStatsDetail(pokeDetails) {
  const pokemon = convertPokeApiDetailToPokemon(pokeDetails)
  const pokemonDetail = new PokemonDetail()
  console.log('pokeDetailStats',pokeDetails)
  pokemonDetail.pokemon = pokemon
  const [hp, attack, defense , specialAttack, specialDefense, speed] = pokeDetails.stats.map((statsSlot) => {
    return { name:statsSlot.stat.name, statBase:statsSlot.base_stat};
  })

  pokemonDetail.speed = speed;
  pokemonDetail.hp = hp;
  pokemonDetail.attack = attack;
  pokemonDetail.defense = defense;
  pokemonDetail.specialAttack = specialAttack;
  pokemonDetail.specialDefense = specialDefense;

  return pokemonDetail
}

pokeApi.getPokemonsDetail = (pokemons) => {
  return fetch(pokemons.url)
    .then((response) => response.json())
    .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 6) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

  return fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => pokemons.map(pokeApi.getPokemonsDetail))
    .then((detailResquest) => Promise.all(detailResquest))
    .then((pokemonsDetails) => pokemonsDetails)
    .catch((error) => console.error(error))
}

pokeApi.getPokemon = (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`

  return fetch(url)
    .then((response) => response.json())
    .then(convertPokeApiStatsDetail)

}