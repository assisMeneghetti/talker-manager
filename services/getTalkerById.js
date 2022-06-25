const { readContentFile } = require('../helpers');

module.exports = async (req, res, next) => {
  try {
    const { id } = req.params;
    const parsedTalkers = await readContentFile('./talker.json');
    const talker = parsedTalkers.find((t) => t.id === +id);
    if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    return res.status(200).json(talker);
  } catch (e) {
    return next(e);
  }
};