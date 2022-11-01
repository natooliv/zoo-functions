const data = require('../data/zoo_data');

const { species, employees } = require('../data/zoo_data');

const resultadoArray = employees.map((objeto) => {
  const arrayObjt = {
    id: objeto.id,
    fullName: `${objeto.firstName} ${objeto.lastName}`,
    species: objeto.responsibleFor.map((id) => species
      .find((specie) => specie.id === id).name),
    locations: objeto.responsibleFor.map((id) => species
      .find((specie) => specie.id === id).location),
  };
  return arrayObjt;
});

function getEmployeesCoverage(parametro) {
  if (parametro === undefined) return resultadoArray;
  const entradaValidada = resultadoArray
    .find((element) => element.fullName.includes(Object.values(parametro))
      || element.id.includes(Object.values(parametro)));
  if (entradaValidada === undefined) {
    throw new Error('Informações inválidas');
  }
  return entradaValidada;
}

module.exports = getEmployeesCoverage;
