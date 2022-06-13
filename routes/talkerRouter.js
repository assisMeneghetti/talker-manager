const express = require('express');

const talkerRouter = express.Router();
const services = require('../services');

talkerRouter.get('/talker', services.getAllTalkers);
talkerRouter.get('/talker/:id', services.getTalkerById);

module.exports = { talkerRouter };