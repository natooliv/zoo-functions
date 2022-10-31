const data = require('../data/zoo_data');

function countEntrants(entrants) {
  return {
    child: entrants.filter(({ age }) => age < 18).length,
    adult: entrants.filter(({ age }) => age >= 18 && age < 50).length,
    senior: entrants.filter(({ age }) => age >= 50).length,
  };
}

function calculateEntry(entrants) {
  if (!entrants || Object.values(entrants).length === 0) return 0;
  const numeroDeVisitantes = countEntrants(entrants);
  const numeroCrianca = numeroDeVisitantes.child * data.prices.child;
  const numeroAdult = numeroDeVisitantes.adult * data.prices.adult;
  const numeroIdoso = numeroDeVisitantes.senior * data.prices.senior;
  return numeroCrianca + numeroAdult + numeroIdoso;
}

module.exports = { calculateEntry, countEntrants };
