const baseUrl = "http://localhost:5000/";

async function getUserID(username, password) {
    const loginData = await login(username, password);

    if (loginData) {
        sessionStorage.setItem("username", username);
        const url = "users/?username=" + username;
        const urlFull = baseUrl + url;
        console.log("Requesting: " + urlFull);

        try {
            const response = await fetch(urlFull);
            const responseText = await response.text();

            const idMatch = responseText.match(/"id":\s*(\d+)/);
            if (idMatch) {
                const id = idMatch[1];
                console.log("ID = " + id);
                return id;
            } else {
                console.log(`User with username ${username} not found.`);
                return null;
            }
        } catch (error) {
            console.error("Error fetching user ID: ", error);
            return null;
        }
    } else {
        throw new Error('Login failed');
    }
}


async function fetchRoutines(url) {
    const urlFull = baseUrl + url;
    console.log("GET Requesting: " + urlFull);
    let result = null;
    try {
        await fetch(urlFull)
            .then((res) => res.json())
            .then((parsedJson) => result = parsedJson);
        console.log("Result fetching = " + JSON.stringify(result));
    } catch (error) {
        console.error('Error fetching data', error);
    }
    return result;
}

async function POSTRoutines(url, data) {
    const urlFull = baseUrl + url;
    console.log("POST Requesting: " + urlFull);
    let result = null;
    await fetch(urlFull,
        {method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(data)
        })
        .then((res) => res.json())
        .then((parsedJson) => result = parsedJson);
    console.log("Result fetching = " + JSON.stringify(result));
    return result;
}

async function updateRoutines(url, data) {
    const urlFull = baseUrl + url;
    console.log("Updating: " + urlFull);
    return fetch(urlFull,
        {method: "PUT",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(data)
        });
}

async function deleteRoutines(url) {
    const urlFull = baseUrl + url;
    console.log("Deleting: " + urlFull);
    return fetch(urlFull,
        {method: "DELETE",
            headers: {"Content-Type" : "application/json"},
        });
}


// http://localhost:5000/users/login?username=xxx&password=yyy
async function login(username, password) {
    const data = await POSTRoutines("users/login?username=" + username + "&password=" + password);
    return data;
}

// http://localhost:5000/users/logout?username=xxx
async function logout(username) {
    const data = await POSTRoutines("users/logout?username=" + username);
    return data;
}

// http://localhost:5000/users/register?username=xxx&password=yyy
async function register(username, password) {
    const data = await POSTRoutines("users/register?username=" + username + "&password=" + password);
    return data;
}


// http://localhost:5000/boards/create?user_id=3&name=board_name&description=board_description
async function createBoard(userID, boardName, boardDescription) {
    const data = await POSTRoutines("boards/create?user_id=" + userID + "&name=" + boardName + "&description=" + boardDescription);
    return data;
}

// http://localhost:5000/boards/?user_id=zzz
async function readBoards(userID) {
    const data = await fetchRoutines("boards/?user_id=" + userID);
    return data;
}

// http://localhost:5000/boards/?id=xxx
async function readBoard(boardID) {
    const data = await fetchRoutines("boards/?id=" + boardID);
    return data;
}

// http://localhost:5000/boards/update?id=xxx&name=yyy&description=zzz
async function updateBoard(boardID, boardName, boardDescription) {
    const data = await updateRoutines("boards/update?id=" + boardID + "&name=" + boardName + "&description=" + boardDescription);
    return data;
}

// http://localhost:5000/boards/delete?id=xxx&name=yyy
async function deleteBoard(boardID, boardName) {
    const data = await deleteRoutines("boards/delete?id=" + boardID + "&name=" + boardName);
    return data;
}


// http://localhost:5000/tasks/create?title=xxx&description=yyy&due_date=zzz&board_id=aaa&status=ccc
async function createTask(taskTitle, taskDescription, taskDueDate, boardID, taskStatus) {
    const data = await POSTRoutines("tasks/create?title=" + taskTitle + "&description=" + taskDescription + "&due_date=" + taskDueDate + "&board_id=" + boardID + "&status=" + taskStatus);
    return data;
}

// http://localhost:5000/tasks/?user_id=xxx&board_id=yyy
async function readTasks(boardID) {
    const data = await fetchRoutines("tasks/?board_id=" + boardID);
    return data;
}

// http://localhost:5000/tasks/update?id=xxx&title=yyy&description=zzz&due_date=aaa&&status=bbb
async function updateTask(taskID, taskTitle, taskDescription, taskDueDate, taskStatus) {
    const data = await updateRoutines("tasks/update?id=" + taskID + "&title=" + taskTitle + "&description=" + taskDescription + "&due_date=" + taskDueDate + "&status=" + taskStatus);
    return data;
}

// http://localhost:5000/tasks/delete?id=xxx
async function deleteTask(taskID) {
    const data = await deleteRoutines("tasks/delete?id=" + taskID);
    return data;
}

// Export the functions
module.exports.createBoard = createBoard;
module.exports.readBoards = readBoards;
module.exports.readBoard = readBoard;
module.exports.updateBoard = updateBoard;
module.exports.deleteBoard = deleteBoard;

module.exports.createTask = createTask;
module.exports.readTasks = readTasks;
module.exports.updateTask = updateTask;
module.exports.deleteTask = deleteTask;

module.exports.login = login;
module.exports.logout = logout;
module.exports.register = register;

module.exports.getUserID = getUserID;