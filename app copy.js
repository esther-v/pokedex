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




pokeName.textContent = "hello";
pokeId.textContent = "hello";

boutonNext.addEventListener('click', () => {
    offset += 20
    getPokemonsList()
    
})

boutonPrev.addEventListener('click', () => {
    offset -= 20
    getPokemonsList()
})


function getPokemonsList() {

    let fetch_config = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }

    fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`, fetch_config)
        .then(function (response) {
            response.json()
                .then(function (data) {
                
                    console.log(data)
                
                var i = 0;
            
                let nomPokemon = document.querySelectorAll('.list-item')
                
                
                nomPokemon.forEach(element => {
                    let id = data.results[i].url.split('pokemon/')[1];
                    let numeroPokemon = id.split('/')[0];

                   
                    function capitalize(string) {
                        return string && string[0].toUpperCase() + string.slice(1);
                    }
            
                    element.textContent = numeroPokemon + ". " + capitalize(data.results[i].name)
                    i++  
       
                });

                })

                   
                })
                .catch(function (error) {
                    console.log(error)
                })
        
        .catch(function (errors) {
        })
}

    
let url = "https://pokeapi.co/api/v2/pokemon/1"
        
    function getFeatures() {

        let fetch_config2 = {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }

        fetch(url, fetch_config2)
        .then(function (response) {
            response.json()
                .then(function (data2) {
                    
                   

                    let namePokemon = document.querySelectorAll('.list-item')

                    namePokemon.forEach(element => {
                        element.addEventListener('click', () => {
                            url = "https://pokeapi.co/api/v2/pokemon/" + element.textContent.match(/\d+/)

                            getFeatures();
                            pokeName.textContent = data2.name;
                            pokeId.textContent = "#00" + data2.id
                            pokeFrontImage.src = data2.sprites.front_default
                            pokeBackImage.src = data2.sprites.back_default 
                            pokeTypeOne.textContent = data2.types[0].type.name

                            if(data2.types[1] == undefined) {
                                pokeTypeTwo.style.display = "none";
                            }

                            else {
                                pokeTypeTwo.style.display = "block";
                                pokeTypeTwo.textContent = data2.types[1].type.name
                            }
                        
                            pokeWeight.textContent = "weight: " + data2.weight
                        
                            pokeHeight.textContent = "height: " + data2.height
                    
                            mainScreen.setAttribute('class', `main-screen ${data2.types[0].type.name}`)
                            
                        })
                
                    

                })

            

                   
                })
                .catch(function (error) {
                    console.log(error)
                })
        
        .catch(function (errors) {
        })


    })
                  
}

getPokemonsList()

getFeatures()