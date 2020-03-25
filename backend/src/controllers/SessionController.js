const conexaobd = require('../database/conexadobd');

module.exports = {
    async create(request, response) {
        const { id } = request.body;

        const ong = await conexaobd('ongs')
        .where('id', id)
        .select('nome')
        .first();


        if(!ong) {
            return response.status(400).json({ error: 'Ong não encontrada com o ID' });
        }
        return response.json(ong);

    }
}

