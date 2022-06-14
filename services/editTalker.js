const { readFile, writeFile } = require('fs/promises');
const newTalkerSchema = require('../schemas/newTalkerSchema');

module.exports = async (req, res) => {
  const { id } = req.params;
  const { authorization } = req.headers;
  const { name, age, talk } = req.body;
  const { error } = newTalkerSchema.validate({ name, age, talk, authorization });
  if (error) {
    const [code, message] = error.message.split('|');
    return res.status(code).json({ message });
  }
  const talkers = await readFile('./talker.json', 'utf-8');
  const parsedTalkers = JSON.parse(talkers);
  const talkerIndex = parsedTalkers.findIndex((t) => t.id === id);
  const updatedTalker = { id: +id, name, age, talk };
  parsedTalkers.splice(talkerIndex, 1, updatedTalker);
  const stringifiedTalkers = JSON.stringify(parsedTalkers, null, 2);
  await writeFile('./talker.json', stringifiedTalkers);
  return res.status(200).json(updatedTalker);
};