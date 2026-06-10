const fs = require('node:fs/promises');
const path = require('path');

// Use __dirname to resolve data files reliably
const dataPath = path.resolve(__dirname);

// Debugging
// console.log("rootPath=" + rootPath);
// console.log("dataPath=" + dataPath);

// Data management layer constants
const USERS = 'users.json';
const BOARDS = 'boards.json';
const TASKS = 'tasks.json';

// DML functions --> Read and write data files in JSON format
async function readDataFile(fileName) {
  try {
    const rawFileContent = await fs.readFile(path.join(dataPath, fileName), { encoding: 'utf8' });
    return JSON.parse(rawFileContent || '[]');
  } catch (err) {
    if (err.code === 'ENOENT') {
      return [];
    }
    throw err;
  }
}

async function writeDataFile(fileName, data) {
  // Write JSON with indentation for readability
  return fs.writeFile(path.join(dataPath, fileName), JSON.stringify(data, null, 2), { encoding: 'utf8' });
}

// DML functions --> Read and write data files for users, boards and tasks
async function readUsers() {
  return readDataFile(USERS);
}

async function writeUsers(users) {
  return writeDataFile(USERS, users);
}

async function readBoards() {
  return readDataFile(BOARDS);
}

async function writeBoards(boards) {
  return writeDataFile(BOARDS, boards);
}

async function readTasks() {
  return readDataFile(TASKS);
}

async function writeTasks(tasks) {
  return writeDataFile(TASKS, tasks);
}

// Export the data management layer functions
module.exports.readDataFile = readDataFile;
module.exports.writeDataFile = writeDataFile;
module.exports.readUsers = readUsers;
module.exports.writeUsers = writeUsers;
module.exports.readBoards = readBoards;
module.exports.writeBoards = writeBoards;
module.exports.readTasks = readTasks;
module.exports.writeTasks = writeTasks;
