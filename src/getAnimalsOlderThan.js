const data = require('../data/zoo_data');

const { species } = data;

const getAnimalsOlderThan = (animal, ages) => species.find(({ name }) => name === animal).residents
  .every(({ age }) => age >= ages);
module.exports = getAnimalsOlderThan;
