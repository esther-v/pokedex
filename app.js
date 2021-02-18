let boutonNext = document.querySelector('.right-button')
let boutonPrev = document.querySelector('.left-button')
let limit = 20;
let offset = 0;

let pokeName = document.querySelector('.poke-name')
let pokeId = document.querySelector('.poke-id')
let pokeFrontImage = document.querySelector('.poke-front-image')
let pokeBackImage = document.querySelector('.poke-back-image')
let pokeTypeOne = document.querySelector('.poke-type-one')
let pokeTypeTwo = document.querySelector('.poke-type-two')
let pokeScreenStats = document.querySelector('.screen__stats')
let pokeWeight = document.querySelector('.stats__weight')
let pokeHeight = document.querySelector('.stats__height')
let mainScreen = document.querySelector('.main-screen')

let nomPokemon = document.querySelectorAll('.list-item')

function capitalize(string) {
    return string[0].toUpperCase() + string.slice(1);
}

function numeroId(identity) {
    identity = identity.toString()
    if (identity.length == 1) {
        identity = "#00" + identity
        return identity
    } 
    else if (identity.length == 2) {
        identity = "#0" + identity
        return identity
    }
    else {
        identity = "#" + identity
        return identity
    }
}



// AFFICHER LA LISTE DES POKEMONS

function getPokemonsList() {

    let fetch_config = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }

    fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`, fetch_config)
        .then(function(response) {
            response.json()
                .then(function(data) {

                    console.log(data)

                    var i = 0;

                    nomPokemon.forEach(element => {
                        let id = data.results[i].url.split('pokemon/')[1];
                        let numeroPokemon = id.split('/')[0];

                        element.textContent = numeroPokemon + ". " + capitalize(data.results[i].name)
                        i++

                    });

                })

        })
        .catch(function(error) {
            console.log(error)
        })

    .catch(function(errors) {})
}

getPokemonsList()

// AFFICHER LA LISTE SUIVANTE OU PRECEDENTE DES POKEMONs QUAND ON CLIQUE SUR LES BOUTONS next et prev

boutonNext.addEventListener('click', () => {
    offset += 20
    getPokemonsList()

})

boutonPrev.addEventListener('click', () => {
    offset -= 20
    getPokemonsList()
})


// AFFICHER LES CARACTERISTIQUES DU POKEMON QUAND ON CLIQUE DESSUS

function getFeatures() {

    let fetch_config2 = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }

    fetch(url, fetch_config2)
        .then(function(response) {
            response.json()
                .then(function(data2) {

                    pokeName.textContent = capitalize(data2.name);
                    pokeId.textContent = numeroId(data2.id) 
                    pokeFrontImage.src = data2.sprites.front_default
                    pokeBackImage.src = data2.sprites.back_default
                    pokeTypeOne.textContent = capitalize(data2.types[0].type.name)

                    if (data2.types[1] == undefined) {
                        pokeTypeTwo.style.display = "none";
                    } else {
                        pokeTypeTwo.style.display = "block";
                        pokeTypeTwo.textContent = capitalize(data2.types[1].type.name)
                    }

                    pokeWeight.textContent = "weight: " + data2.weight

                    pokeHeight.textContent = "height: " + data2.height

                    mainScreen.setAttribute('class', `main-screen ${data2.types[0].type.name}`)

                })

        })

    .catch(function(error) {
        console.log(error)
    })

    .catch(function(errors) {})

}


let url = "https://pokeapi.co/api/v2/pokemon/1"

nomPokemon.forEach(element => {
    element.addEventListener('click', () => {
        url = "https://pokeapi.co/api/v2/pokemon/" + element.textContent.match(/\d+/)
        getFeatures();
    })
})


// KONAMI CODE 

const pressed = [];
const secretCode = 'pokemon';


window.addEventListener('keyup', (e) => {
    console.log(e.key);
    pressed.push(e.key);
    pressed.splice(-secretCode.length - 1, pressed.length - secretCode.length)

    if (pressed.join('').includes(secretCode)) {
        console.log('PIKACHU');
        
        let div = document.createElement('div');
        document.body.appendChild(div);
        let pikachu = document.createElement('img')
        div.appendChild(pikachu)
        pikachu.src = "https://static.posters.cz/image/1300/affiches/pokemon-pikachu-neon-i71936.jpg"
        pikachu.style.weight = '100px'
        pikachu.style.height = '300px'
           
        
    }
})


