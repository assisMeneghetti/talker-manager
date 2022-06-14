const express = require('express');
const rescue = require('express-rescue');

const talkerRouter = express.Router();
const services = require('../services');

talkerRouter.get('/talker', services.getAllTalkers);
talkerRouter.get('/talker/search', rescue(services.searchTalker));
talkerRouter.get('/talker/:id', services.getTalkerById);
talkerRouter.post('/login', services.login);
talkerRouter.post('/talker', rescue(services.createTalker));
talkerRouter.put('/talker/:id', rescue(services.editTalker));
talkerRouter.delete('/talker/:id', rescue(services.deleteTalker));

module.exports = { talkerRouter };