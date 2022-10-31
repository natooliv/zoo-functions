const data = require('../data/zoo_data');

function getSpeciesByIds(...ids) {
  const animal = data.species.filter((animaL) => ids.includes(animaL.id));
  return animal;
}
module.exports = getSpeciesByIds;
