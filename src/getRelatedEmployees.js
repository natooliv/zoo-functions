const data = require('../data/zoo_data');

const { employees } = data;

const stephanieId = '9e7d4524-363c-416a-8759-8aa7e50c0992';
const olaId = 'fdb2543b-5662-46a7-badc-93d960fdc0a8';
const burlId = '0e7b460e-acf4-4e17-bcb3-ee472265db83';

function isManager(id) {
  // Foi declarado uma  condição  para verificar se o id informado como parametro corresponde ao de gerente;
  // O teste informa quais são os gerentes -> const managers = [stephanieId, olaId, burlId];

  if (id === stephanieId || id === olaId || id === burlId) {
    // Foi usado HOF some para buscar o Id informado acima, retornando true.
    return employees.some((manager) => manager.id === id);
  }
  return false;
}

function getRelatedEmployees(managerId) {
  // Utilizado uma const para guardar o resultado da função em uma variavel.
  const resultado = isManager(managerId);
  //  Declarado uma condição para verificar se o id passado ao invocar a função é um gerente, e caso seja falso, retornar o erro.
  if (resultado !== true) {
    // insere o erro se o id pesquisado nao seja de um gerente.
    throw new Error('O id inserido não é de uma pessoa colaboradora gerente!');
  }
  // Utilizado  a HOF filter para filtrar o array employees e acessar o  array managers com a HOF some e verificar se o ID do gerente  é igual ao parametro informado na função e por último;
  // Utilizado  a HOF map para retornar um array com o nome dos funcionários que o gerente é responsável.

  return employees.filter((employee) => employee.managers
    .some((value) => value === managerId))
    .map((names) => `${names.firstName} ${names.lastName}`);
}

module.exports = { isManager, getRelatedEmployees };
