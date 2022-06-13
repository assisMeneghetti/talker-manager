const crypto = require('crypto');

module.exports = async (req, res, next) => {
  try {
    const token = crypto.randomBytes(8).toString('hex');
    return res.status(200).json({ token });
  } catch (e) {
    return next(e);
  }
};