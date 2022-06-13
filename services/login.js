const crypto = require('crypto');
const loginSchema = require('../schemas/loginSchema');

module.exports = async (req, res, next) => {
  try {
    // const { email, password } = req.body;
    const { error } = loginSchema.validate(req.body);

    if (error) {
      const [code, message] = error.message.split('|');
      return res.status(code).json({ message });
    }
    // criar um middleware de autenticação
    // encriptar a senha e salvar 
    // salvar o email e a senha em um arquivo para validação
    const token = crypto.randomBytes(8).toString('hex');
    return res.status(200).json({ token });
  } catch (e) {
    return next(e);
  }
};