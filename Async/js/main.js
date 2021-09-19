let start = 1;
let finish = 25;

const loadBt = document.querySelector('#load-bt');

function fetchAllPokemon() {

    const promises = [];

    for (let i = start; i <= finish; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;

        promises.push(fetch(url).then(res => res.json()));
    }

    Promise.all(promises).then(results => {
        const allpokemon = results.map(data => ({
            name: data.name,
            id: data.id,
            image: data.sprites["front_default"],
            imageBack: data.sprites["back_default"],
            type: data.types.map(type => type.type.name),
            ability: data.abilities.map(ability => ability.ability.name)
        }))
        displayPokemon(allpokemon);
    })
}


function displayPokemon(allpokemon) {
    console.log(allpokemon)

    allpokemon.forEach(pokemon => {

        pokemonCard(pokemon);
        pokemonName(pokemon);
        pokemonInfo(pokemon);

    })
    

}

function pokemonCard(pokemon) {
    const div = document.createElement('div');

    div.classList.add(`pokemon-card-${pokemon.id}`);
    div.classList.add('pokemon');
    div.classList.add(cardColor(pokemon));

    document.querySelector('.container').appendChild(div);
}

function pokemonName(pokemon) {
        const div = document.createElement('div');
        const h2 = document.createElement('h2');
        const img = document.createElement('img');

        img.setAttribute('src', `${pokemon.image}`);
        h2.textContent = `#${pokemon.id} ${pokemon.name}`

        div.appendChild(img);
        div.appendChild(h2);

        div.classList.add('pokemon-name');

        document.querySelector(`.pokemon-card-${pokemon.id}`).appendChild(div);
}

function cardColor(pokemon){
    const type = pokemon.type;
    return type[0]
}

function pokemonInfo(pokemon) {
    const div = document.createElement('div');
    const img = document.createElement('img');

    img.setAttribute('src', `${pokemon.imageBack}`);
    div.appendChild(img);

    div.classList.add(`pokemon-info-${pokemon.id}`);
    div.classList.add('pokemon-info')

    document.querySelector(`.pokemon-card-${pokemon.id}`).appendChild(div);

    typeInfo(pokemon);
    abilityInfo(pokemon);
}

function typeInfo(pokemon) {
    const h2 = document.createElement('h2');
    const p = document.createElement('p');
    h2.textContent = 'Type(s):'
    p.textContent = `${pokemon.type.join(' and ')}`

    document.querySelector(`.pokemon-info-${pokemon.id}`).appendChild(h2);
    document.querySelector(`.pokemon-info-${pokemon.id}`).appendChild(p);
}

function abilityInfo(pokemon) {
    const h2 = document.createElement('h2');
    const p = document.createElement('p');
    h2.textContent = `Abilities:`
    p.textContent = `${pokemon.ability.join(' or ')}`

    document.querySelector(`.pokemon-info-${pokemon.id}`).appendChild(h2);
    document.querySelector(`.pokemon-info-${pokemon.id}`).appendChild(p);
}

function loadMorePokemon() {
    start+=25;
    finish+=25;
    fetchAllPokemon();
}

window.addEventListener('load', fetchAllPokemon);

loadBt.addEventListener('click', loadMorePokemon);