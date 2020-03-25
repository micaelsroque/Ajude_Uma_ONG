const crypto = require('crypto');
const conexaobd = require('../database/conexadobd');

module.exports = {

    //GET
 async index(request, response) {
    const ongs = await conexaobd('ongs').select('*');

    return response.json(ongs);
},

    //POST
    async create(request, response) {
        const { nome, email, whatsapp, cidade, uf } =  request.body;

        const id = crypto.randomBytes(4).toString('HEX');
    
        await conexaobd('ongs').insert({
            id,
            nome,
            email,
            whatsapp,
            cidade,
            uf,
        })
        
        return response.json();    
    }
};