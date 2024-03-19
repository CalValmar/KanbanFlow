const dml = require('../data/dataManagementLayer');
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

const router = express.Router();

// Authentication Middleware
function authenticateUser(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401); // if there isn't any token

    jwt.verify(token, 'secret-key', (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user; 
        next();
    });
}

// Get all users : GET /users/list
router.get('/list', async (req, res, next) => {
    const users = await dml.readUsers();
    res.json({users})
    console.log('[INFO] All users retrieved');
});

// Get a user info by his id or username : GET /users/?id=xxx&username=yyy
router.get('/', async (req, res, next) => {
    const userId = req.query.id;
    const username = req.query.username;

    try { // Retrieve the user by the user ID or username
        const users = await dml.readUsers();
        const user = users.find(user => parseInt(user.id) === parseInt(userId) || user.username === username);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json({user});
        if (userId) console.log('[INFO] User retrieved for ID : ' + userId);
        if (username) console.log('[INFO] User retrieved for username : ' + username);
    } catch (error) { 
        console.error("[ERROR]", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Login an existing user : POST /users/login?username=xxx&password=yyy
router.post('/login', async (req, res, next) => {
    const existedUsers = await dml.readUsers();
    const username = req.query.username;
    const password = req.query.password;
    const user = existedUsers.find(user => user.username === username);
    if (!user) {
        console.log(`[ERROR] Username not found: ${username}`);
        return res.status(404).json({ error: "Username not found" });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        console.log(`[ERROR] Incorrect password for username: ${username}`);
        return res.status(400).json({ error: "Incorrect password" });
    }
    const token = jwt.sign({ id: user.id, username: user.username }, 'secret-key');
    console.log('[INFO] User logged in : ' + username);
    res.json({message: "Logged in successfully", token: token});
});

// Register a new user : POST /users/register?username=xxx&password=yyy
router.post('/register', async (req, res, next) => {
    const existedUsers = await dml.readUsers();
    const id = existedUsers.length + 1;
    const username = req.query.username;
    const password = req.query.password;
    const user = existedUsers.find(user => user.username === username);
    if (user) {
        console.log(`[ERROR] Username already exists: ${username}`);
        return res.status(400).json({ error: "Username already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, saltRounds); 
    const token = jwt.sign({id: id, username: username }, 'secret-key');
    const newUser = {
        id: id,
        username: username,
        password: hashedPassword,
        created_at: new Date().toISOString(),
        token: token
    };
    const allUsers = [...existedUsers, newUser];
    await dml.writeUsers(allUsers);
    console.log('[INFO] New user created : ' + username);
    res.json({newUser, message: "Registered successfully"});
});

// Update a user, name or password : PUT /users/update?id=xxx&username=yyy&password=zzz
router.put('/update', async (req, res, next) => {
    const existedUsers = await dml.readUsers();

    const userId = req.query.id;
    const username = req.query.username;
    const password = req.query.password;
    const user = existedUsers.find(user => parseInt(user.id) === parseInt(userId) || user.username === username);

    if (!user) {
        console.log(`[ERROR] User not found for ID: ${userId} or username: ${username}`);
        return res.status(404).json({ error: "User not found" });
    }
    const allUsers = existedUsers.map(user => {
        if (parseInt(user.id) === parseInt(userId) || user.username === username) {
            return {
                ...user,
                username: username || user.username,
                password: password || user.password
            }
        }
        return user;
    });
    await dml.writeUsers(allUsers);
    res.json({user});
    if (userId) console.log('[INFO] User updated for ID : ' + userId);
    if (username) console.log('[INFO] User updated for username : ' + username);
});

// Delete a user by his name or id : DELETE /users/delete?id=xxx&username=yyy
router.delete('/delete', async (req, res, next) => {
    const existedUsers = await dml.readUsers();

    const userId = req.query.id;
    const username = req.query.username;
    const user = existedUsers.find(user => parseInt(user.id) === parseInt(userId) || user.username === username);

    if (!user) {
        console.log(`[ERROR] User not found for ID: ${userId} or username: ${username}`);
        return res.status(404).json({ error: "User not found" });
    }
    const allUsers = existedUsers.filter(user => parseInt(user.id) !== parseInt(userId) && user.username !== username);
    await dml.writeUsers(allUsers);
    res.json({user});
    if (userId) console.log('[INFO] User deleted for ID : ' + userId);
    if (username) console.log('[INFO] User deleted for username : ' + username);
});


module.exports = router;
module.exports.authenticateUser = authenticateUser;