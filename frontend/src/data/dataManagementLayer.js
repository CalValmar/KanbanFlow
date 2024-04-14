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

async function saveRoutines(url, data) {
    const urlFull = baseUrl + url;
    console.log("Posting: " + urlFull);
    return fetch(urlFull,
        {method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(data)
        }
    );
}

async function readBoards(userID) {
    const data = await fetchRoutines("boards/?user_id=" + userID);
    return data;
}

async function readTasks(boardID) {
    const data = await fetchRoutines("tasks/?board_id=" + boardID);
    return data;
}

async function login(username, password) {
    const data = await POSTRoutines("users/login?username=" + username + "&password=" + password);
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
module.exports.getUserID = getUserID;