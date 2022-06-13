const express = require('express');

const talkerRouter = express.Router();
const services = require('../services');

talkerRouter.get('/talker', services.getAllTalkers);

module.exports = { talkerRouter };