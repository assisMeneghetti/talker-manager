// const { writeFile } = require('fs/promises');
const { readContentFile, writeContentFile } = require('../helpers');
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
  const parsedTalkers = await readContentFile('./talker.json');
  const talkerIndex = parsedTalkers.findIndex((t) => t.id === id);
  const updatedTalker = { id: +id, name, age, talk };
  parsedTalkers.splice(talkerIndex, 1, updatedTalker);
  await writeContentFile('./talker.json', updatedTalker, 'update');
  return res.status(200).json(updatedTalker);
};