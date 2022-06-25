// src: https://github.dev/tryber/sd-019-c-live-lectures/tree/lecture/22.6-exercicio4
const fs = require('fs').promises;

const readContentFile = async (path) => {
  try {
    const content = await fs.readFile(path, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

const writeContentFile = async (path, content, op) => {
  try {
    const arrContent = await readContentFile(path) || [];
    if (op === 'delete') {
      await fs.writeFile(path, JSON.stringify(content, null, 2));
      return content;
    } 
      arrContent.push(content); 
      await fs.writeFile(path, JSON.stringify(arrContent, null, 2));
      return content;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

module.exports = {
  readContentFile,
  writeContentFile,
};