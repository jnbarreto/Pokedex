
const loadstatsBtn = document.getElementById("pokemonDetail")

function loadPokemonStats(id) {
    pokeApi.getPokemon(id)
        .then((pokemon) => {
            console.log('pokemon',pokemon)
            const newHtml = `
                <span class="number">#${pokemon.pokemon.number}</span>
                <span class="name">${pokemon.pokemon.name}</span>

                <div class="detail">
                    <ol class="types">
                        ${pokemon.pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join("")}
                    </ol>
                    <img src="${pokemon.pokemon.img}"
                        alt="${pokemon.pokemon.name}"/>
                </div>
                <h3> Stats Base </h3>
            `
            const detailProperties = ["hp", "speed", "attack", "defense", "specialAttack", "specialDefense"];
            const newDetail = `
                <div class="content-pokemon-detail">
                    ${detailProperties.map(property => `
                        <div class="detail-stats">
                            <h3>${pokemon[property].name}:</h3>
                            <span>${pokemon[property].statBase}</span>
                        </div>
                        <div class="barra">
                            <div id="${pokemon[property].name}">
                                .
                            </div>
                        </div>
                    `).join("")}
                </div>
            `;

            loadstatsBtn.classList.add(pokemon.pokemon.type);
            loadstatsBtn.innerHTML += newHtml
            loadstatsBtn.innerHTML += newDetail

            const statIds = ["hp", "speed", "attack", "defense", "special-attack", "special-defense"];

            statIds.forEach(statId => {
                const progressElement = document.getElementById(statId);
                const statAttributeName = statId.replace(/-([a-z])/g, (_, match) => match.toUpperCase());

                const statBaseValue = pokemon[statAttributeName].statBase;
                setStatBaseWidth(progressElement, statBaseValue);
            });

        })
}

function setStatBaseWidth(element, value) {
    var widthValue = value > 100 ? 100 : value;
    element.setAttribute("style", "width:" + widthValue + "%");
}