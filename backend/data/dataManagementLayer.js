const fs = require('node:fs/promises');
const db = require('../database.js');
const path = require('path');

const rootPath = path.dirname(process.mainModule.filename);
const dataPath = path.join(rootPath, "data");

console.log("rootPath=" + rootPath);
console.log("dataPath=" + dataPath);

// Data (JSON files) management layer constants
const USERS = "users.json";
const BOARDS = "boards.json";
const TASKS = "tasks.json";

// Data (Database) management layer constants
const USERS_FILE = "users.json";
const BOARDS_FILE = "boards.json";
const TASKS_FILE = "tasks.json";


// DML functions --> Read and write data files in JSON format
async function readDataFile(fileName) {
    const rawFileContent = await fs.readFile(path.join(dataPath, fileName));
    return JSON.parse(rawFileContent);
}


async function writeDataFile(fileName, data) {
    return await fs.writeFile(path.join(dataPath, fileName), JSON.stringify(data), {encoding: "utf-8"});
}


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


//  DML functions --> Database management ----------------------------

// Function to save data from the database to JSON files
async function saveDBDataToJSON() {
    try {
        // Read data from the database
        const users = await readUsersFromDB();
        const boards = await readBoardsFromDB();
        const tasks = await readTasksFromDB();

        // Write data to JSON files
        await writeDataFile(USERS_FILE, users);
        await writeDataFile(BOARDS_FILE, boards);
        await writeDataFile(TASKS_FILE, tasks);

        console.log("[INFO] Data saved from database to JSON files");
    } catch (error) {
        console.error("[ERROR] Error saving data from database to JSON files:", error);
    }
}

// Function to save data from JSON files to the database
async function saveJSONDataToDB() {
    try {
        // Read data from JSON files
        const users = await readDataFile(USERS_FILE);
        const boards = await readDataFile(BOARDS_FILE);
        const tasks = await readDataFile(TASKS_FILE);

        // Save data to the database
        // Order is important because of foreign key constraints : Clear Tasks -> Boards -> Users // Save Users -> Boards -> Tasks
        await clearDBTasks(); // Clear to avoid duplicates
        await clearDBBoards(); 
        await clearDBUsers();

        await saveUsersToDB(users);
        await saveBoardsToDB(boards);
        await saveTasksToDB(tasks);

        console.log("[INFO] Data saved from JSON files to database");
    } catch (error) {
        console.error("[ERROR] Error saving data from JSON files to database:", error);
    }
}

// Function to save Users table from JSON file to the database
async function saveUsersJsonToDB() {
    try {
        const users = await readDataFile(USERS_FILE);
        await updateUsersInDB(users);

        console.log("[INFO] Users table saved from JSON file to database");
    } catch (error) {
        console.error("[ERROR] Error saving Users table from JSON file to database:", error);
    }
}

// Function to save Boards table from JSON file to the database
async function saveBoardsJsonToDB() {
    try {
        const boards = await readDataFile(BOARDS_FILE);
        await updateBoardsInDB(boards);

        console.log("[INFO] Boards table saved from JSON file to database");
    } catch (error) {
        console.error("[ERROR] Error saving Boards table from JSON file to database:", error);
    }
}

// Function to save Tasks table from JSON file to the database
async function saveTasksJsonToDB() {
    try {
        const tasks = await readDataFile(TASKS_FILE);
        await updateTasksInDB(tasks);

        console.log("[INFO] Tasks table saved from JSON file to database");
    } catch (error) {
        console.error("[ERROR] Error saving Tasks table from JSON file to database:", error);
    }
}


// Function to clear Users table in the database
async function clearDBUsers() {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM Users', (err, results) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(results);
            }
        });
    });
}

// Function to clear Boards table in the database
async function clearDBBoards() {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM Boards', (err, results) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(results);
            }
        });
    });
}

// Function to clear Tasks table in the database
async function clearDBTasks() {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM Tasks', (err, results) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(results);
            }
        });
    });
}


// Function to read users from the database
async function readUsersFromDB() {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM Users', (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
}

// Function to save users to the database
async function saveUsersToDB(users) {
    // Convert users objects to array of arrays
    const usersData = users.map(user => {
        // Convert created_at to MySQL datetime format
        const createdAt = new Date(user.created_at).toISOString().slice(0, 19).replace('T', ' ');
        return [user.id, user.username, user.password, createdAt];
    });

    return new Promise((resolve, reject) => {
        db.query('INSERT INTO Users (id, username, password, created_at) VALUES ?', [usersData], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
}

// Function to update users in the database
async function updateUsersInDB(users) {
    // Convert users objects to array of arrays
    const usersData = users.map(user => {
        // Convert created_at to MySQL datetime format
        const createdAt = new Date(user.created_at).toISOString().slice(0, 19).replace('T', ' ');
        return [user.username, user.password, createdAt, user.id];
    });

    // Execute an UPDATE statement for each user
    for (const userData of usersData) {
        await new Promise((resolve, reject) => {
            db.query('UPDATE Users SET username=?, password=?, created_at=? WHERE id=?', userData, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }
}


// Function to read boards from the database
async function readBoardsFromDB() {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM Boards', (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
}

// Function to save boards to the database
async function saveBoardsToDB(boards) {
    // Convert boards objects to array of arrays
    const boardsData = boards.map(board => {
        // Convert created_at to MySQL datetime format
        const createdAt = new Date(board.created_at).toISOString().slice(0, 19).replace('T', ' ');
        return [board.id, board.name, board.user_id, createdAt];
    });

    return new Promise((resolve, reject) => {
        db.query('INSERT INTO Boards (id, name, user_id, created_at) VALUES ?', [boardsData], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
}

// Function to update boards in the database
async function updateBoardsInDB(boards) {
    // Convert boards objects to array of arrays
    const boardsData = boards.map(board => {
        // Convert created_at to MySQL datetime format
        const createdAt = new Date(board.created_at).toISOString().slice(0, 19).replace('T', ' ');
        return [board.name, board.user_id, createdAt, board.id];
    });

    // Execute an UPDATE statement for each board
    for (const boardData of boardsData) {
        await new Promise((resolve, reject) => {
            db.query('UPDATE Boards SET name=?, user_id=?, created_at=? WHERE id=?', boardData, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }
}


// Function to read tasks from the database
async function readTasksFromDB() {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM Tasks', (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
}

// Function to save tasks to the database
async function saveTasksToDB(tasks) {
    // Convert tasks objects to array of arrays
    const tasksData = tasks.map(task => {
        // Convert due_date and created_at to MySQL datetime format
        const dueDate = new Date(task.due_date).toISOString().slice(0, 19).replace('T', ' ');
        const createdAt = new Date(task.created_at).toISOString().slice(0, 19).replace('T', ' ');
        return [task.id, task.title, task.description, dueDate, task.status, task.board_id, task.user_id, createdAt];
    });

    return new Promise((resolve, reject) => {
        db.query('INSERT INTO Tasks (id, title, description, due_date, status, board_id, user_id, created_at) VALUES ?', [tasksData], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
}

// Function to update tasks in the database
async function updateTasksInDB(tasks) {
    // Convert tasks objects to array of arrays
    const tasksData = tasks.map(task => {
        // Convert due_date and created_at to MySQL datetime format
        const dueDate = new Date(task.due_date).toISOString().slice(0, 19).replace('T', ' ');
        const createdAt = new Date(task.created_at).toISOString().slice(0, 19).replace('T', ' ');
        return [task.title, task.description, dueDate, task.status, task.board_id, task.user_id, createdAt, task.id];
    });

    // Execute an UPDATE statement for each task
    for (const taskData of tasksData) {
        await new Promise((resolve, reject) => {
            db.query('UPDATE Tasks SET title=?, description=?, due_date=?, status=?, board_id=?, user_id=?, created_at=? WHERE id=?', taskData, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }
}

//saveJSONDataToDB();   // OK
//saveDBDataToJSON();   // OK
//saveUsersJsonToDB();  // OK
//saveBoardsJsonToDB(); // OK
//saveTasksJsonToDB();  // OK

// Export the data management layer functions
module.exports.readDataFile  = readDataFile;
module.exports.writeDataFile = writeDataFile;
module.exports.readUsers     = readUsers;
module.exports.writeUsers    = writeUsers;
module.exports.readBoards    = readBoards;
module.exports.writeBoards   = writeBoards;
module.exports.readTasks     = readTasks;
module.exports.writeTasks    = writeTasks;

// Export the database management layer functions
module.exports.saveDBDataToJSON = saveDBDataToJSON;
module.exports.saveJSONDataToDB = saveJSONDataToDB;

module.exports.saveUsersJsonToDB  = saveUsersJsonToDB;
module.exports.saveBoardsJsonToDB = saveBoardsJsonToDB;
module.exports.saveTasksJsonToDB  = saveTasksJsonToDB;

module.exports.clearDBUsers  = clearDBUsers;
module.exports.clearDBBoards = clearDBBoards;
module.exports.clearDBTasks  = clearDBTasks;