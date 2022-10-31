const data = require('../data/zoo_data');

const { employees } = data;

function getEmployeeByName(employeeName) {
  if (employeeName === undefined) return {};
  const location = employees
    .find(({ firstName, lastName }) => firstName === employeeName || lastName === employeeName);
  return location;
}
// console.log(getEmployeeByName('Burl'));
module.exports = getEmployeeByName;
