const Joi = require('joi').extend(require('@joi/date'));

module.exports = Joi.object({
  authorization: Joi.string()
    .required()
    .length(16)
    .messages({
      'any.required': '401|Token não encontrado',
      'string.length': '401|Token inválido',
    }),
  name: Joi.string()
  .min(3)
  .required()
  .messages({
    'any.required': '400|O campo "name" é obrigatório',
    'string.min': '400|O "name" deve ter pelo menos 3 caracteres',
  }),
  age: Joi.number()
  .required()
  .min(18)
  .messages({
    'any.required': '400|O campo "age" é obrigatório',
    'number.min': '400|A pessoa palestrante deve ser maior de idade',
  }),
  talk: Joi.object({
      watchedAt: Joi.date()
      .format('DD/MM/YYYY')
      .required()
      .messages({
        'any.required': '400|O campo "watchedAt" é obrigatório',
        'date.format': '400|O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
      }),
      rate: Joi.number()
      .max(5)
      .integer()
      .positive()
      .strict()
      .required()
      .messages({
        'any.required': '400|O campo "rate" é obrigatório',
        'number.positive': '400|O campo "rate" deve ser um inteiro de 1 à 5',
        'number.max': '400|O campo "rate" deve ser um inteiro de 1 à 5',
      }),
    })
    .required()
    .messages({
      'any.required': '400|O campo "talk" é obrigatório',
    }),
});
