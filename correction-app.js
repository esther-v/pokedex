let prev_button = document.querySelector('.left-button');
let next_button = document.querySelector('.right-button');
let right_container = document.querySelector('.right-container__screen');
let left_container = document.querySelector('.main-screen');
let left_container_background = document.querySelector('.main-section__black');

async function fetchData(url) {
    let response = await fetch(url);
    return response.json();
}

function generateElement(pokemons) {
    right_container.innerHTML = "";
    pokemons.forEach(pokemon => {
        right_container.innerHTML += `<div class="list-item">${pokemon.name}</div>`;
    });
}

function setupButtons(previous, next) {
    prev_button.setAttribute('data-url', previous);
    next_button.setAttribute('data-url', next);
}

async function updateElements(target) {
    let url = target.getAttribute('data-url');
    let data = await fetchData(url);
    generateElement(data.results);
    setupButtons(data.previous, data.next);
}

(async function() {

    let data = await fetchData("https://pokeapi.co/api/v2/pokemon?limit=20&offset=0");
    generateElement(data.results);
    setupButtons(data.previous, data.next);

    prev_button.addEventListener('click', (e) => updateElements(e.target));

    next_button.addEventListener('click', (e) => updateElements(e.target));

})();