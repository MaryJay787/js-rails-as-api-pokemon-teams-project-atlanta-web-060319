document.addEventListener('DOMContentLoaded', setUpPage)
const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons/`

function setUpPage(){
    getAllTrainers()
}

function getAllTrainers(){
    fetch(TRAINERS_URL)
    .then(res => res.json())
    .then(trainers => listAllTrainers(trainers))
}

function listAllTrainers(trainers){
    trainers.forEach(train => trainerCard(train))
    
}


function trainerCard(train){
    let main = document.querySelector('.main')
    let div = document.createElement('div')
    div.className = 'card'
    div.dataset
    
    let p = document.createElement('p')
    p.innerText = train.name

    let addPokemon = document.createElement('button')
    addPokemon.innerText = 'Add Pokemon'
    addPokemon.dataset.id = train.id
    
    let ul = document.createElement('ul')
    train.pokemons.forEach(function(poke){
        let li = document.createElement('li')
        li.innerText = poke.nickname
        li.setAttribute('class', 'class')
        
        let releaseBtn = document.createElement('button')
        releaseBtn.innerText = 'Release'
        releaseBtn.addEventListener('click', handleRelease)
        releaseBtn.setAttribute('class', 'release')
        releaseBtn.dataset.id = poke.id
        
        li.appendChild(releaseBtn)
        ul.appendChild(li)
        
    })

    function handleRelease(e){
        e.target.parentElement.remove()
        releasePokemon(e.target.dataset.id)
    }
    
    function releasePokemon(id){
        console.log(id)
        fetch(`http://localhost:3000/pokemons/${id}`, {
            method: 'DELETE'
        }).then((res)=>res.json())
        .then((data)=>console.log(data))
    }
    

    main.appendChild(div)
    div.appendChild(p)
    div.appendChild(addPokemon)

    div.appendChild(ul)
}

