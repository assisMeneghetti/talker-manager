const { readContentFile, writeContentFile } = require('../helpers');
const authSchema = require('../schemas/authSchema');

module.exports = async (req, res) => {
  const { id } = req.params;
  const { authorization } = req.headers;
  const { error } = authSchema.validate({ authorization });
  if (error) {
    const [code, message] = error.message.split('|');
    return res.status(code).json({ message });
  }
  const parsedTalkers = await readContentFile('./talker.json');
  const talkerIndex = parsedTalkers.findIndex((t) => t.id === +id);
  if (talkerIndex === -1) {
    res.status(404).json({ message: 'Palestrante não encontrado' });
  } else {
    parsedTalkers.splice(talkerIndex, 1);
    await writeContentFile('./talker.json', parsedTalkers, 'delete');
    return res.status(204).end();
  }
};