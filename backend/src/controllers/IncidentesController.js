const conexaobd = require('../database/conexadobd');

module.exports = {

    async index(request, response) {
        //para paginação
        const { page = 1 } = request.query;


        //contando a quantidade de registros da aplicação
        const [contador] = await conexaobd('incidentes').count();
        
       
        //usando paginação de 5 resultados na query
        const incidentes = await conexaobd('incidentes')
        .join('ongs', 'ongs.id', '=', 'incidentes.ong_id')
        .limit(5)
        .offset((page - 1) * 5)
        .select(['incidentes.*',
         'ongs.nome',
         'ongs.email',
         'ongs.whatsapp',
         'ongs.cidade',
         'ongs.uf'
        ]); //essa query está filtrando os campos que necessitamos das tabelas
        
        //retornando no head a quantidade de registros (passar comando count)
        response.header('ContadorCasos', contador['count(*)']);

        return response.json(incidentes);
    },

    async create(request, response) {
        const { titulo, descricao, value } = request.body;
        const ong_id = request.headers.authorization;

       const [id] = await conexaobd('incidentes').insert({
            titulo,
            descricao,
            value,
            ong_id,
        });

        return response.json({ id });
    },

    async delete(request, response) {
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        const incidentes = await conexaobd('incidentes')
        .where('id', id)
        .select('ong_id')
        .first();

        if (incidentes.ong_id != ong_id) {
            return response.status(401).json({ error: 'Operacao não permitida!' });
        }

        await conexaobd('incidentes').where('id', id).delete();

        return response.status(204).send();

        
    },

};