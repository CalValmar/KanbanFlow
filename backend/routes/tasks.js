const express = require('express');
const dml = require('../data/dataManagementLayer');
const { verify } = require('jsonwebtoken');
// const authenticatedToken = require('./users.js');

const router = express.Router();

// Verify status of a task : can only be --> "todo", "in-progress", "done"
function verifyStatus(status) {
    if (status === "todo" || status === "in-progress" || status === "done") {
        return true;
    } else {
        return false, console.log('[ERROR] Status not valid');
    }
};


// Get all tasks : GET /tasks/list
router.get('/list', async (req, res, next) => {
    try {
        const tasks = await dml.readTasks();
        res.status(200).json(tasks);
        console.log('[INFO] All tasks retrieved');
    } catch (err) {
        next(err);
    }
});

// Get tasks by user_id or board_id : GET /tasks/?user_id=xxx&board_id=yyy
router.get('/', async (req, res, next) => {
    const userId = req.query.user_id;
    const boardId = req.query.board_id;

    try {
        const tasks = await dml.readTasks();
        const task = tasks.filter(task => parseInt(task.user_id) === parseInt(userId) || parseInt(task.board_id) === parseInt(boardId));
        if (task) {
            res.status(200).json(task);
            if (userId) console.log('[INFO] Task retrieved for user ID : ' + userId);
            if (boardId) console.log('[INFO] Task retrieved for board ID : ' + boardId);
        } else {
            res.status(404).send('Task not found');
            console.log('[ERROR] Task not found');
        }
    } catch (err) {
        next(err);
    }
});

// Create a new task : POST /tasks/create?title=xxx&description=yyy&due_date=zzz&board_id=aaa&user_id=bbb&status=ccc


// Update a task : PUT /tasks/update?id=xxx&title=yyy&description=zzz&due_date=aaa&&status=bbb
router.put('/update', async (req, res, next) => {
    const taskId = req.query.id;
    const title = req.query.title;
    const description = req.query.description;
    const dueDate = req.query.due_date;
    const status = verifyStatus(req.query.status);

    try {
        const tasks = await dml.readTasks();
        const task = tasks.find(task => parseInt(task.id) === parseInt(taskId));
        if (task) {
            if (title) task.title = title;
            if (description) task.description = description;
            if (dueDate) task.due_date = dueDate;
            if (status) task.status = status;
            await dml.writeTasks(tasks);
            res.status(200).json(task);
            console.log('[INFO] Task updated for ID : ' + taskId);
        } else {
            res.status(404).send('Task not found');
            console.log('[ERROR] Task not found');
        }
    } catch (err) {
        next(err);
    }
});

// Delete a task : DELETE /tasks/delete?id=xxx
router.delete('/delete', async (req, res, next) => {
    const taskId = req.query.id;

    try {
        const tasks = await dml.readTasks();
        const task = tasks.find(task => parseInt(task.id) === parseInt(taskId));
        if (task) {
            const newTasks = tasks.filter(task => parseInt(task.id) !== parseInt(taskId));
            await dml.writeTasks(newTasks);
            res.status(200).send('Task deleted');
            console.log('[INFO] Task deleted for ID : ' + taskId);
        } else {
            res.status(404).send('Task not found');
            console.log('[ERROR] Task not found');
        }
    } catch (err) {
        next(err);
    }
});

module.exports = router;