const Joi = require('joi').extend(require('@joi/date'));

module.exports = Joi.object({
  authorization: Joi.string()
    .required()
    .length(16)
    .messages({
      'any.required': '401|Token não encontrado',
      'string.length': '401|Token inválido',
    }),
});
