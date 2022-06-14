const express = require('express');
const rescue = require('express-rescue');

const talkerRouter = express.Router();
const services = require('../services');

talkerRouter.get('/talker', services.getAllTalkers);
talkerRouter.get('/talker/:id', services.getTalkerById);
talkerRouter.post('/login', services.login);
talkerRouter.post('/talker', rescue(services.createTalker));
talkerRouter.put('/talker/:id', rescue(services.editTalker));

module.exports = { talkerRouter };