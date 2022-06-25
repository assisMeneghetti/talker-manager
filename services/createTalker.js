// const { writeFile } = require('fs/promises');
const { readContentFile, writeContentFile } = require('../helpers');
const newTalkerSchema = require('../schemas/newTalkerSchema');

module.exports = async (req, res) => {
    const { name, age, talk } = req.body;
    const { authorization } = req.headers;
    const { error } = newTalkerSchema.validate({ name, age, talk, authorization });
    if (error) {
      const [code, message] = error.message.split('|');
      return res.status(code).json({ message });
    }
    const parsedTalkers = await readContentFile('./talker.json');
    const curId = parsedTalkers.length === 0 ? 1 : Math.max(...parsedTalkers.map((t) => t.id)) + 1;
    const newTalker = { name, age, id: curId, talk };
    // parsedTalkers.push(newTalker);
    // const stringifiedTalkers = JSON.stringify(parsedTalkers, null, 2);
    // await writeFile('./talker.json', stringifiedTalkers);
    await writeContentFile('./talker.json', newTalker, 'create');
    return res.status(201).json(newTalker);
};
