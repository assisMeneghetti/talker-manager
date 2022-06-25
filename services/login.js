const crypto = require('crypto');
const loginSchema = require('../schemas/loginSchema');

module.exports = async (req, res, next) => {
  try {
    const { error } = loginSchema.validate(req.body);

    if (error) {
      const [code, message] = error.message.split('|');
      return res.status(code).json({ message });
    }
    const token = crypto.randomBytes(8).toString('hex');
    return res.status(200).json({ token });
  } catch (e) {
    return next(e);
  }
};