const baseUrl = "http://localhost:5000/";

async function fetchRoutines(url) {
    const urlFull = baseUrl + url;
    console.log("requesting: " + urlFull);
    let result = null;
    await fetch(urlFull)
        .then((res) => res.json())
        .then((parsedJson) => result = parsedJson);
    console.log("result= " + JSON.stringify(result));
    return result;
}

function saveRoutines(url, data) {
    const urlFull = baseUrl + url;
    console.log("posting: " + urlFull);
    return fetch(urlFull,
        {method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(data)
        }
    );
}function saveRoutines(url, data) {
    const urlFull = baseUrl + url;
    console.log("posting: " + urlFull);
    return fetch(urlFull,
        {method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(data)
        }
    );
}

async function readBoards(userID) {
    const data = await fetchRoutines("boards/?user_id=" + userID);
    return data.items;
}

async function readTasks(boardID) {
    const data = await fetchRoutines("tasks/?board_id=" + boardID);
    return data.items;
}

async function login(username, password) {
    const data = await fetchRoutines("users/login?username=" + username + "&password=" + password);
    return data;
}

async function logout(username) {
    const data = await fetchRoutines("users/logout?username=" + username);
    return data;
}

async function register(username, password) {
    const data = await fetchRoutines("users/register?username=" + username + "&password=" + password);
    return data;
}


module.exports.readBoards = readBoards;
module.exports.readTasks = readTasks;
module.exports.login = login;
module.exports.logout = logout;
module.exports.register = register;