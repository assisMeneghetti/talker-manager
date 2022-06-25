const express = require('express');
const rescue = require('express-rescue');

const talkerRoute = express.Router();
const services = require('../services');

talkerRoute.get('/talker', services.getAllTalkers);
talkerRoute.get('/talker/search', rescue(services.searchTalker));
talkerRoute.get('/talker/:id', services.getTalkerById);
talkerRoute.post('/login', services.login);
talkerRoute.post('/talker', rescue(services.createTalker));
talkerRoute.put('/talker/:id', rescue(services.editTalker));
talkerRoute.delete('/talker/:id', rescue(services.deleteTalker));

module.exports = talkerRoute;