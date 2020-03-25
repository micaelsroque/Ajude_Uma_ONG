const knex = require('knex');
const configuracao = require('../../knexfile');

const conexaobd = knex(configuracao.development)

module.exports = conexaobd;