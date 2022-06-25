const { readContentFile } = require('../helpers');

module.exports = async (_req, res, next) => {
  try {
    const parsedTalkers = await readContentFile('./talker.json');
    return res.status(200).json(parsedTalkers);
  } catch (e) {
    return next(e);
  }
};