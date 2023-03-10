const data = require('../data/zoo_data');

const animals = (local) => data.species.filter((obj) => obj.location === local).map((a) => a.name);

const verifySexOrSort = (local, opt) => data.species.filter((obj) => obj.location === local)
  .map((animal) => ({ [animal.name]: animal.residents
    .filter((resid) => !opt.sex || opt.sex === resid.sex)
    .map((obj) => obj.name)
    .sort((a, b) => ((opt.sorted) ? a.localeCompare(b) : 0)) }));

const chooseOptions = (opt, fn) => data.species.map((obj) => obj.location)
  .reduce((a, b) => {
    if (!a.includes(b)) a.push(b);
    return a;
  }, []).reduce((a, b) => ({ ...a, [b]: fn(b, opt) }), {});

const getAnimalMap = (options) => ((!options || !options.includeNames)
  ? chooseOptions(options, animals) : chooseOptions(options, verifySexOrSort));

// console.log();

module.exports = getAnimalMap;
