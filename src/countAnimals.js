const { species } = require('../data/zoo_data');

const objetoQtdAnimais = species.reduce((acc, specie) => {
  acc[specie.name] = specie.residents.length;
  return acc;
}, {});

// Lógica para encontrar informar o numero de animais por nome. Usei a HOF reduce que veirifca a condição solicitada no requisito e depois o operador ternário, que ao verificar ser verddeira, gurada no acumulador o valor encontrado e ao verificar ser false, manter o acumulador da forma inicial. Por último, como precisava saber o tamanho do array criado, utilizo o length que retorna a quantidade de itens de um array. Importante o parametro passado é um objeto, por isso ao comparar a condição na linha 13, utilizo o parametro.specie(animal.specie) para acessar o valor informado.
const qtdAnimaisResidentes = (animal) => species
  .reduce((sum, spec) => ((spec.name === animal.specie)
    ? (spec.residents) : (sum)), 0).length;

// Função para verificar a quantidade de animais de determinado sexo. Lógica semelhante a anterior, porém realizo antes uma busca com a HOF find para encontrar o objeto com o animal correspondente do parametro e porteriormente, utilizo o reduce de forma semelhante para contabilizar a quantidade de animais por sexo, utilizando novament o operador ternário, porém neste função, a cada vez que a condição é verdadeira somo 1 ao acumulador e no final, teremos o retorno com o numero de animais do sexo passado como parametro. Mesma lógica para acessar o valor informado por parametro (animal.specie e animal.sex).
const qtdAnimaisSexo = (animal) => {
  const filtroAnimais = species
    .find((specie) => specie.name === animal.specie).residents;
  const animals = filtroAnimais
    .reduce((acc, sexo) => ((sexo.sex === animal.sex) ? (acc + 1) : (acc)), 0);
  return animals;
};

// Função para fazer as verifições solicitadas no requisito:
function countAnimals(animal) {
  // Condição que verifica se a função foi chamada sem parametro. Retorna o objeto armazenado na const objetoQtdAnimais.
  if (animal === undefined) {
    return objetoQtdAnimais;
  }
  // Condição para validar a entrada de parametros. O Object.values retorna um array com os valores de um objeto, portanto ao verificar o tamanho deste array e comparar com 1, saberemos que houve entrada no parametro, retornando true e executando o bloco de código do if.
  if (Object.values(animal).length === 1) {
    return qtdAnimaisResidentes(animal);
  }
  // Se as demais condições não forem atendidas, retornamos está situação.
  return qtdAnimaisSexo(animal);
}
module.exports = countAnimals;
