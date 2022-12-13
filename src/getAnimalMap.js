const data = require('../data/zoo_data');

const { species } = data;
// Solução utilizando reduce encontrada no repositório de Gabriel Rodrigues.

function report() {
  return species.reduce((accumulator, animal) => {
    const local = animal.location;
    if (!accumulator[local]) {
      accumulator[local] = [];
    }
    accumulator[local].push(animal.name);
    return accumulator;
  }, {});
}
function namesReport(options) {
  const { sorted, sex } = options;
  return species.reduce((accumulator, animal) => {
    if (!accumulator[animal.location]) {
      accumulator[animal.location] = [];
    }
    let list = [];
    if (sex) {
      list = animal.residents.filter((res) => res.sex === sex).map((res) => res.name);
    } else {
      list = animal.residents.map((res) => res.name);
    }
    if (sorted) {
      list.sort();
    }
    accumulator[animal.location].push({ [animal.name]: list });
    return accumulator;
  }, {});
}
function getAnimalMap(options = {}) {
  if (!options.includeNames) {
    return report();
  }
  return namesReport(options);
}

module.exports = getAnimalMap;
