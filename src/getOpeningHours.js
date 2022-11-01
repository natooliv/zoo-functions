const { hours } = require('../data/zoo_data');

const diasdaSemana = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const erroDia = 'The day must be valid. Example: Monday';

const stringNumber = (string, what) => {
  if (!/^\d+$/.test(string)) {
    throw new Error(`The ${what} should represent a number`);
  }
};

const validacao = (abbreviation) => {
  if (!['AM', 'PM'].includes(abbreviation)) {
    throw new Error('The abbreviation must be \'AM\' or \'PM\'');
  }
};

const validacaoHora = (hour) => {
  const [number, abbreviation] = hour.toUpperCase().split('-');
  const [dataHours, dataMinutes] = number.split(':');
  stringNumber(dataHours, 'hour');
  stringNumber(dataMinutes, 'minutes');
  validacao(abbreviation);
  switch (false) {
  case Number(dataHours) >= 0 && Number(dataHours) <= 12:
    throw new Error('The hour must be between 0 and 12');
  case Number(dataMinutes) >= 0 && Number(dataMinutes) <= 59:
    throw new Error('The minutes must be between 0 and 59');
  default:
    return null;
  }
};

const validacaoData = (day) => {
  if (!diasdaSemana.includes(day)) {
    throw new Error(erroDia);
  }
};

const empty = (one, two) => !one && !two;

const fix12 = (hour, open, close) => ({
  h: (hour === 12) ? 0 : hour,
  o: (open === 12) ? 0 : open,
  c: (close === 12) ? 0 : close,
});

const openOrClosed = (period, hour, open, close) => {
  const { o, c, h } = fix12(hour, open, close);
  return (period === 'AM' && h >= o) || (period === 'PM' && h < c);
};

const getOpeningHours = (day, dataHour) => {
  if (empty(day, dataHour)) return hours;
  const adjustedDay = `${day[0].toUpperCase()}${day.slice(1).toLowerCase()}`;
  validacaoData(adjustedDay);
  validacaoHora(dataHour);
  const { open, close } = hours[adjustedDay];
  if (empty(close, open)) return 'The zoo is closed';
  const periodo = dataHour.split('-')[1].toUpperCase();
  const hour = Number(dataHour.split(':')[0]);
  let message = 'The zoo is ';
  message += openOrClosed(periodo, hour, open, close) ? 'open' : 'closed';
  return message;
};

module.exports = getOpeningHours;
