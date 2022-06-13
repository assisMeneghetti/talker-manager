const { readFile } = require('fs/promises');

module.exports = async (_req, res, next) => {
  try {
    const talkers = await readFile('./talker.json', 'utf-8');
    const parsedTalkers = JSON.parse(talkers);
    return res.status(200).json(parsedTalkers);
  } catch (e) {
    return next(e);
  }
};