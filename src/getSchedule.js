const data = require('../data/zoo_data');

const { species, hours } = require('../data/zoo_data');

// Seleciono os dias da semana através do Object.keys do objeto hours do arquivo zoo_data, formando um array.
const diasUteis = Object.keys(hours);

// Função para criar o objeto geral com as informações do funcionamento do zoológico.
const geralZoo = () => {
  // O reduce irá montar o obejto de forma dinamica. a cada iteração ele armazena o objeto de acordo com o dia da semana informado pelo elem no acc e ao final, retornamos o acc com o resultado do array com o objeto completo. A regra de negócio para os values do objeto com chave officeHour foi atraves da notaçao de objeto para acessr o value com os hoários em que o zoo funciona.Já a chave exhibition, foi utilizada a HOF filter em species para acessar o array availability e assim, verificaçãor se o animal está disponivel naquele dia da semana, usando o includes. Para finalizar, utilizo a HOF map para criar o array com o nome da espécie.
  // A regra de negócio para montar o objeto precisou ser reatribuida, uma vez que o Monday tem uma característica especifica, por este motivo, depois de montado o objeto, acesso o objeto no dia que precisa ser modificado para setar o retorno como solicitado no requisito.
  const objeto = diasUteis.reduce((acc, elem) => {
    acc[elem] = {
      officeHour: `Open from ${hours[elem].open}am until ${hours[elem].close}pm`,
      exhibition: species.filter((animal) => animal.availability.includes(elem)).map((a) => a.name),
    };
    return acc;
  }, {});
  objeto.Monday = {
    officeHour: 'CLOSED',
    exhibition: 'The zoo will be closed!',
  };
  return objeto;
};

// Função que verificação a entrada de parametros e forma de pesquisa das informações do funcionamento do zoo.
function getSchedule(scheduleTarget) {
  // Verifico se função chamada sem parametros e retorno o objeto criado no geralZoo.
  if (scheduleTarget === undefined) {
    return geralZoo();
  }

  // const que aramzena lógica para verificaçãor se encontra alguma especie com nome igual ao parametro informado, retornando true ou false. O if verificação se a palavra digitada é valida, caso não seja válida, entra no if e retorna o objeto da função zoo.
  const verificação = species
    .some((cond) => scheduleTarget === cond.name);
  if (!verificação && !diasUteis.includes(scheduleTarget)) {
    return geralZoo();
  }
  // verificação qual é o dia da semana informado e retorna apenas as informações daquele dia informado. Utilizo o includes para verificaçãor no array diaDaSemana tem a palavra informada e assim, trazer o objeto com as informações especificas.
  if (diasUteis.includes(scheduleTarget)) {
    return { [scheduleTarget]: geralZoo()[scheduleTarget] };
  }
  // retorna o dia da semana que o animal está disponivel para visitação de acordo com o parametro informado,utilizei a HOF find para trazer o dia da semana que esta armazenado no array availability.
  return species.find((teste) => teste.name === scheduleTarget).availability;
}
module.exports = getSchedule;
