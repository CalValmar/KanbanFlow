// This file contains the functions to fetch data from the server

// URL of the server
const baseUrl = "http://localhost:5000/";

// Function to fetch data from the server
// async function fetchRoutines(url) {
//     const urlFull = `${baseUrl}${url}`;
//     console.log(`requesting: ${urlFull}`);
//     try {
//         const response = await fetch(urlFull);
//         const result = await response.json();
//         console.log(`result= ${JSON.stringify(result)}`);
//         return result;
//     } catch (error) {
//         console.error(`Error: ${error}`);
//         return null;
//     }
// }

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

// Functions to fetch users list 
async function usersList() {
    try {
        const data = await fetchRoutines("users/list");
        return data.items;
    } catch (error) {
        console.error(`Error: ${error}`);
        return [];
    }
}

// Functions to fetch boards list
async function boardsList() {
    try {
        const data = await fetchRoutines("boards/list");
        return data.items;
    } catch (error) {
        console.error(`Error: ${error}`);
        return [];
    }
}

// // Functions to fetch tasks list
// async function tasksList() {
//     try {
//         const data = await fetchRoutines("tasks/list"); // = result
//         console.log(`data= ${JSON.stringify(data)}`); // = result
//         console.log(`data.items= ${JSON.stringify(data.items)}`); // ?? undefined
//         return data.items;  // ?? undefined
//     } catch (error) {
//         console.error(`Error: ${error}`);
//         return [];
//     }
// }

async function tasksList() {
    const data = await fetchRoutines("tasks/list");
    return data.items;
}


// Export the functions
module.exports.usersList    = usersList;
module.exports.boardsList   = boardsList;
module.exports.tasksList    = tasksList;
