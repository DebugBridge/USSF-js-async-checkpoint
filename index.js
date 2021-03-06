//input is a .txt file
//command line tool
//get poke type based on pokemon name
const fs = require('fs');
const fetch = require('node-fetch');
// node "index.js" pokemon.txt

//process.args -- allow to mess with cmd
 var pokemonFileInput = process.argv[2];

// from nick's file - TEMP -
// const pokemonArr = function(filePath) {
//   return new Promise(function(resolve, reject){
//     fs.readFile(filePath, 'utf8', (err, data) =>{
//       if (err) {
//         reject (err);
//       }else{
//         const textToLines = data.split(/\r?\n/);
//         resolve(textToLines)
//     }
//     })
//   })
//   }

//test input. This should be the function that filters the .txt file
let pokemonArr = ['ditto', 'charizard'];

//feeding in pokemon array to fiter fetch
let requests = pokemonArr.map(pokemon => fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`));

//requests will be an array of promises to execute fetch requests for each name

Promise.all(requests)
.then(responses => Promise.all(responses.map(r => r.json())))
.then(pokemons  => {
  for (let i = 0; i < pokemons.length; i++){
    let acc = {name: pokemons[i].name, type: []}
    for(let j = 0; j < pokemons[i].types.length; j++){
      if ( j === pokemons[i].types.length -1){
        acc.type.push(pokemons[i].types[j].type.name)
        console.log(`${acc.name}: ${acc.type}`)
      } else {
        acc.type.push(pokemons[i].types[j].type.name)
      }
    }
  }
  return
})
.catch(error => console.error(error))



//Promise Road Map

// let tempFunction = function (cmdinput){
//   return new Promise(resolve, reject){

//   }
// }

// tempFunction(pokemonFileInput)


// let testfunc = function (pokemon){
//   return new promise(resolve => {
//     fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
//   .then(data => data.json())
//   .then(type => type.types.forEach((element) =>{console.log(element.type.name)}))
//   .catch(error => console.error(error))
//   })
//   fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
//   .then(data => data.json())
//   .then(type => type.types.forEach((element) =>{console.log(element.type.name)}))
//   .catch(error => console.error(error))
//   }
