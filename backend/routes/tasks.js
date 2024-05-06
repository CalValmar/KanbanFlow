const express = require('express');
const dml = require('../data/dataManagementLayer');

const router = express.Router();

// Verify status of a task : can only be --> "todo", "in-progress", "done"
function verifyStatus(status) {
    if (status === "To-Do" || status === "In-Progress" || status === "Done") {
        return status;
    } else {
        return false, console.log('[ERROR] Status not valid');
    }
};


// Get all tasks : GET /tasks/list
router.get('/list', async (req, res, next) => {
    try {
        const tasks = await dml.readTasks();
        res.json({tasks});
        console.log('[INFO] All tasks retrieved');
    } catch (error) {
        console.error("[ERROR]", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Get tasks by user_id or board_id : GET /tasks/?board_id=yyy
router.get('/', async (req, res, next) => {
    const boardId = req.query.board_id;

    try {
        const tasks = await dml.readTasks();
        const task = tasks.filter(task => parseInt(task.board_id) === parseInt(boardId));
        if (task) {
            res.status(200).json(task);
            if (boardId) console.log('[INFO] Task retrieved for board ID : ' + boardId);
        } else {
            res.status(404).send('Task not found');
            console.log('[ERROR] Task not found');
        }
    } catch (err) {
        next(err);
    }
});

// Create a new task : POST /tasks/create?title=xxx&description=yyy&due_date=zzz&board_id=aaa&status=ccc
router.post('/create', async (req, res, next) => {
    const title = req.query.title;
    const description = req.query.description;
    const dueDate = req.query.due_date;
    const boardId = parseInt(req.query.board_id);
    const userId = req.session.userId;
    const status = verifyStatus(req.query.status);

    try {
        const tasks = await dml.readTasks();
        const newTask = {
            id: tasks.length + 1,
            title: title,
            description: description,
            due_date: dueDate,
            board_id: boardId,
            user_id: userId,
            status: status,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        };
        tasks.push(newTask);
        await dml.writeTasks(tasks);
        res.status(201).json(newTask);
        console.log('[INFO] New task created : ' + title);
    } catch (err) {
        next(err);
    }
});


// Update a task : PUT /tasks/update?id=xxx&title=yyy&description=zzz&due_date=aaa&&status=bbb
router.put('/update', async (req, res, next) => {
    const taskId = req.query.id;
    const title = req.query.title;
    const description = req.query.description;
    const dueDate = req.query.due_date;
    const status = verifyStatus(req.query.status);
    const updated_at = new Date().toISOString();

    try {
        const tasks = await dml.readTasks();
        const task = tasks.find(task => parseInt(task.id) === parseInt(taskId));
        if (task) {
            if (title) task.title = title;
            if (description) task.description = description;
            if (dueDate) task.due_date = dueDate;
            if (updated_at) task.updated_at = updated_at;
            if (status) {
                task.status = status;
                await dml.writeTasks(tasks);
                res.status(200).json(task);
                console.log('[INFO] Task updated for ID : ' + taskId);
            } else {
                res.status(400).send('[WARNING] Invalid status');
                console.log('[WARNING] Invalid status');
            }
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

// Tasks attributes : 
//const taskAttributes = {
//    id: 'integer',            // Primary key
//    title: 'string',          // Title of the task
//    description: 'string',    // Description of the task
//    due_date: 'string',       // Due date of the task
//    board_id: 'integer',      // Foreign key to board 
//    status: 'string',         // Status of the task
//    created_at: 'timestamp',  // Created date of the task
//    updated_at: 'timestamp'   // Updated date of the task
//};

module.exports = router;