const Joi = require('joi');

module.exports = Joi.object({
  email: Joi.string()
    .required()
    .email()
    .messages({
      'any.required': '400|O campo "email" é obrigatório',
      'string.email': '400|O "email" deve ter o formato "email@email.com"',
    }),
  password: Joi.string()
    .required()
    .min(6)
    .messages({
      'any.required': '400|O campo "password" é obrigatório',
      'string.min': '400|O "password" deve ter pelo menos 6 caracteres', 
    }),
});
