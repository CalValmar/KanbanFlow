const express = require('express');
const bcrypt = require('bcrypt');
const dml = require('../data/dataManagementLayer');

const saltRounds = 10;

const router = express.Router();

// Get all users : GET /users/list
router.get('/list', async (req, res, _next) => {
  try {
    const users = await dml.readUsers();
    res.json({ users });
    console.log('[INFO] All users retrieved');
  } catch (error) {
    console.error('[ERROR]', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get a user info by his id or username : GET /users/?id=xxx&username=yyy
router.get('/', async (req, res, _next) => {
  const userId = req.query.id;
  const { username } = req.query;

  try { // Retrieve the user by the user ID or username
    const users = await dml.readUsers();
    const user = users.find((u) => (userId && parseInt(u.id) === parseInt(userId)) || (username && u.username === username));
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ user });
    if (userId) console.log(`[INFO] User retrieved for ID : ${userId}`);
    if (username) console.log(`[INFO] User retrieved for username : ${username}`);
  } catch (error) {
    console.error('[ERROR]', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Login an existing user : POST /users/login?username=xxx&password=yyy
router.post('/login', async (req, res, _next) => {
  try {
    const existedUsers = await dml.readUsers();
    const username = (req.body && req.body.username) || req.query.username;
    const password = (req.body && req.body.password) || req.query.password;
    if (!username || !password) return res.status(400).json({ error: 'Missing username or password' });
    const user = existedUsers.find((u) => u.username === username);
    if (!user) {
      console.log(`[ERROR] Username not found: ${username}`);
      return res.status(404).json({ error: 'Username not found' });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      console.log(`[ERROR] Incorrect password for username: ${username}`);
      return res.status(400).json({ error: 'Incorrect password' });
    }
    req.session.userId = user.id;
    console.log(`[INFO] User logged in : ${username}`);
    res.json({ message: 'Logged in successfully' });
  } catch (error) {
    console.error('[ERROR]', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Disconnect a user : POST /users/logout?username=xxx
router.post('/logout', async (req, res, _next) => {
  try {
    // simply destroy session
    if (req.session) {
      req.session.destroy((err) => {
        if (err) {
          console.error('[ERROR] Failed to destroy session', err);
          return res.status(500).json({ error: 'Failed to logout' });
        }
        res.json({ message: 'Logged out successfully' });
      });
    } else {
      res.json({ message: 'No active session' });
    }
    console.log('[INFO] User logged out');
  } catch (error) {
    console.error('[ERROR]', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Register a new user : POST /users/register?username=xxx&password=yyy
router.post('/register', async (req, res, _next) => {
  try {
    const existedUsers = await dml.readUsers();
    const username = (req.body && req.body.username) || req.query.username;
    const password = (req.body && req.body.password) || req.query.password;
    if (!username || !password) return res.status(400).json({ error: 'Missing username or password' });
    const user = existedUsers.find((u) => u.username === username);
    if (user) {
      console.log(`[ERROR] Username already exists: ${username}`);
      return res.status(400).json({ error: 'Username already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const id = existedUsers.length > 0 ? Math.max(...existedUsers.map((u) => parseInt(u.id) || 0)) + 1 : 1;
    const newUser = {
      id,
      username,
      password: hashedPassword,
      profile_picture: 'https://github.com/CalValmar/KanbanFlow/blob/main/src/default.jpg?raw=true',
      created_at: new Date().toISOString(),
    };
    const allUsers = [...existedUsers, newUser];
    await dml.writeUsers(allUsers);
    console.log(`[INFO] New user created : ${username}`);
    res.json({ newUser, message: 'Registered successfully' });
  } catch (error) {
    console.error('[ERROR]', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update a user, name or password : PUT /users/update?id=xxx&username=yyy&password=zzz
router.put('/update', async (req, res, _next) => {
  try {
    const existedUsers = await dml.readUsers();

    const userId = (req.body && req.body.id) || req.query.id;
    const username = (req.body && req.body.username) || req.query.username;
    const password = (req.body && req.body.password) || req.query.password;
    const user = existedUsers.find((u) => (userId && parseInt(u.id) === parseInt(userId)) || (username && u.username === username));

    if (!user) {
      console.log(`[ERROR] User not found for ID: ${userId} or username: ${username}`);
      return res.status(404).json({ error: 'User not found' });
    }

    let hashedPassword = null;
    if (password) {
      hashedPassword = await bcrypt.hash(password, saltRounds);
    }

    const allUsers = existedUsers.map((u) => {
      if ((userId && parseInt(u.id) === parseInt(userId)) || (username && u.username === username)) {
        return {
          ...u,
          username: username || u.username,
          password: hashedPassword || u.password,
        };
      }
      return u;
    });
    await dml.writeUsers(allUsers);
    res.json({ user, message: 'Updated successfully' });
    if (userId) console.log(`[INFO] User updated for ID : ${userId}`);
    if (username) console.log(`[INFO] User updated for username : ${username}`);
  } catch (error) {
    console.error('[ERROR]', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a user by his name or id : DELETE /users/delete?id=xxx&username=yyy
router.delete('/delete', async (req, res, _next) => {
  try {
    const existedUsers = await dml.readUsers();

    const userId = (req.body && req.body.id) || req.query.id;
    const username = (req.body && req.body.username) || req.query.username;
    const user = existedUsers.find((u) => (userId && parseInt(u.id) === parseInt(userId)) || (username && u.username === username));

    if (!user) {
      console.log(`[ERROR] User not found for ID: ${userId} or username: ${username}`);
      return res.status(404).json({ error: 'User not found' });
    }
    const allUsers = existedUsers.filter((u) => !((userId && parseInt(u.id) === parseInt(userId)) || (username && u.username === username)));
    await dml.writeUsers(allUsers);
    res.json({ user, message: 'Deleted successfully' });
    if (userId) console.log(`[INFO] User deleted for ID : ${userId}`);
    if (username) console.log(`[INFO] User deleted for username : ${username}`);
  } catch (error) {
    console.error('[ERROR]', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Users attributes :
// const userAttributes = {
//    id: 'integer',              // Primary key
//    username: 'string',            // Username of the user
//    password: 'string',           // Password of the user
//    profile_picture: 'string',    // Profile picture of the user
//    created_at: 'timestamp',      // Created date of the user
//    updated_at: 'timestamp'       // Updated date of the user
// };

module.exports = router;
