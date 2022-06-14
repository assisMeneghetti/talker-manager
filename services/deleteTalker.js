const { readFile, writeFile } = require('fs/promises');
const authSchema = require('../schemas/authSchema');

module.exports = async (req, res) => {
  const { id } = req.params;
  const { authorization } = req.headers;
  const { error } = authSchema.validate({ authorization });
  if (error) {
    const [code, message] = error.message.split('|');
    return res.status(code).json({ message });
  }
  const talkers = await readFile('./talker.json', 'utf-8');
  const parsedTalkers = JSON.parse(talkers);
  const talkerIndex = parsedTalkers.findIndex((t) => t.id === +id);
  if (talkerIndex === -1) {
    res.status(404).json({ message: 'Palestrante não encontrado' });
  } else {
    parsedTalkers.splice(talkerIndex, 1);
    const stringifiedTalkers = JSON.stringify(parsedTalkers, null, 2);
    await writeFile('./talker.json', stringifiedTalkers);
    return res.status(204).end();
  }
};