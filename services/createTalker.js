const { readFile, writeFile } = require('fs/promises');
const newTalkerSchema = require('../schemas/newTalkerSchema');

module.exports = async (req, res) => {
    const { name, age, talk } = req.body;
    const { authorization } = req.headers;
    const { error } = newTalkerSchema.validate({ name, age, talk, authorization });
    if (error) {
      const [code, message] = error.message.split('|');
      return res.status(code).json({ message });
    }
    const talkers = await readFile('./talker.json', 'utf-8');
    const parsedTalkers = JSON.parse(talkers);
    const curId = Math.max(...parsedTalkers.map((talker) => talker.id)) + 1;
    const newTalker = { name, age, id: curId, talk };
    parsedTalkers.push(newTalker);
    const stringifiedTalkers = JSON.stringify(parsedTalkers, null, 2);
    await writeFile('./talker.json', stringifiedTalkers);
    return res.status(201).json(newTalker);
};
