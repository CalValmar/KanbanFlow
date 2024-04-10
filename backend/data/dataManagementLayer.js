const fs = require('node:fs/promises');
const path = require('path');

const rootPath = path.dirname(process.mainModule.filename);
const dataPath = path.join(rootPath, "data");

console.log("rootPath=" + rootPath);
console.log("dataPath=" + dataPath);

// Data management layer constants
const USERS = "users.json";
const BOARDS = "boards.json";
const TASKS = "tasks.json";

// DML functions --> Read and write data files in JSON format
async function readDataFile(fileName) {
    const rawFileContent = await fs.readFile(path.join(dataPath, fileName));
    return JSON.parse(rawFileContent);
}

async function writeDataFile(fileName, data) {
    return await fs.writeFile(path.join(dataPath, fileName), JSON.stringify(data), {encoding: "utf-8"});
}

// DML functions --> Read and write data files for users, boards and tasks
async function readUsers() {
    return await readDataFile(USERS);
}

async function writeUsers(users) {
    return await writeDataFile(USERS, users);
}

async function readBoards() {
    return await readDataFile(BOARDS);
}

async function writeBoards(boards) {
    return await writeDataFile(BOARDS, boards);
}

async function readTasks() {
    return await readDataFile(TASKS);
}

async function writeTasks(tasks) {
    return await writeDataFile(TASKS, tasks);
}

// Export the data management layer functions
module.exports.readDataFile  = readDataFile;
module.exports.writeDataFile = writeDataFile;
module.exports.readUsers     = readUsers;
module.exports.writeUsers    = writeUsers;
module.exports.readBoards    = readBoards;
module.exports.writeBoards   = writeBoards;
module.exports.readTasks     = readTasks;
module.exports.writeTasks    = writeTasks;