const express = require('express');

const OngController = require('./controllers/OngController');
const IncidentesController = require('./controllers/IncidentesController');
const PerfilController = require('./controllers/PerfilController');
const SessionController = require('./controllers/SessionController.js');

const routes = express.Router();

routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create);

//login
routes.post('/session', SessionController.create);

//Incidentes
routes.get('/perfil', PerfilController.index);

routes.get('/incidentes', IncidentesController.index);
routes.post('/incidentes', IncidentesController.create);
routes.delete('/incidentes', IncidentesController.delete);

module.exports = routes;