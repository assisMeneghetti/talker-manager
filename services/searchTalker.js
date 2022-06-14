const { readFile } = require('fs/promises');
const authSchema = require('../schemas/authSchema');

module.exports = async (req, res) => {
  const { q = '' } = req.query;
  const { authorization } = req.headers;
  const { error } = authSchema.validate({ authorization });
  if (error) {
    const [code, message] = error.message.split('|');
    return res.status(code).json({ message });
  }
  const talkers = await readFile('./talker.json', 'utf-8');
  const parsedTalkers = JSON.parse(talkers);
  const filteredTalkers = parsedTalkers.filter((t) => {
    const lowerCasedQuery = q.toLowerCase();
    const lowerCasedName = t.name.toLowerCase();
    return lowerCasedName.includes(lowerCasedQuery);
  });
  return res.status(200).json(filteredTalkers);
};