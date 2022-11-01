const data = require('../data/zoo_data');

function getOldestFromFirstSpecies(id) {
  // Utilizei  a HOF find no array de empregados para encontrar o funcionario com o id igual ao informado como parametro e seleciono o primeiro elemento deste array.
  const idPrimeiroAnimal = data.employees.find((func) => func.id === id).responsibleFor[0];
  // Utilizei novamente a HOF find para encontrar o animaldata no array de especies com o id igual ao do animal selecionado na const idPrimeiroAnimal e seto o array residents.
  const animalObj = data.species.find((specie) => specie.id === idPrimeiroAnimal).residents;
  // colocoquei em ordem crescente com a HOF sort o array contido na const animalObj atraves da key age.
  // assim o animal mais velho estará na última posição. Para acessar a última posição do array, utilizo o tamanho do array -1. e por fim, para ter acesso aos valores do objeto, utilizo o Object.values que retorna um array com os valores do objeto.
  return Object.values(animalObj.sort((a, b) => a.age - b.age)[animalObj.length - 1]);
}

module.exports = getOldestFromFirstSpecies;
