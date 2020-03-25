const conexaobd = require('../database/conexadobd');

module.exports = {
    async index(request, response) {
        const ong_id = request.headers.authorization;

        const incidentes = await conexaobd('incidentes')
        .where('ong_id', ong_id)
        .select('*');

        return response.json(incidentes)
    }
}