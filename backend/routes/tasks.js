const express = require('express');
const dml = require('../data/dataManagementLayer');

const router = express.Router();

// Verify status of a task : can only be --> "todo", "in-progress", "done"
function verifyStatus(status) {
  if (!status) return false;
  const normalized = String(status).toLowerCase();
  const allowed = ['todo', 'to-do', 'in-progress', 'done'];
  if (allowed.includes(normalized)) {
    // normalize to a consistent lowercase form
    if (normalized === 'to-do') return 'todo';
    return normalized;
  }
  console.log('[ERROR] Status not valid:', status);
  return false;
}

// Get all tasks : GET /tasks/list
router.get('/list', async (req, res, _next) => {
  try {
    const tasks = await dml.readTasks();
    res.json({ tasks });
    console.log('[INFO] All tasks retrieved');
  } catch (error) {
    console.error('[ERROR]', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get tasks by user_id or board_id : GET /tasks/?board_id=yyy
router.get('/', async (req, res, _next) => {
  const boardId = req.query.board_id;

  try {
    const tasks = await dml.readTasks();
    const filtered = boardId ? tasks.filter((t) => parseInt(t.board_id) === parseInt(boardId)) : tasks;
    if (filtered && filtered.length > 0) {
      res.status(200).json({ tasks: filtered });
      if (boardId) console.log(`[INFO] Task retrieved for board ID : ${boardId}`);
    } else {
      res.status(404).json({ error: 'Task not found' });
      console.log('[ERROR] Task not found');
    }
  } catch (err) {
    _next(err);
  }
});

// Create a new task : POST /tasks/create?title=xxx&description=yyy&due_date=zzz&board_id=aaa&status=ccc
router.post('/create', async (req, res, _next) => {
  const title = (req.body && req.body.title) || req.query.title;
  const description = (req.body && req.body.description) || req.query.description;
  const dueDate = (req.body && req.body.due_date) || req.query.due_date;
  const boardId = req.body && req.body.board_id ? parseInt(req.body.board_id) : (req.query.board_id ? parseInt(req.query.board_id) : null);
  const userId = req.session ? req.session.userId : null;
  const status = verifyStatus((req.body && req.body.status) || req.query.status) || 'todo';

  if (!title || !boardId) {
    return res.status(400).json({ error: 'Missing required fields: title and board_id' });
  }

  try {
    const tasks = await dml.readTasks();
    const nextId = tasks.length > 0 ? Math.max(...tasks.map((t) => parseInt(t.id) || 0)) + 1 : 1;
    const newTask = {
      id: nextId,
      title,
      description: description || '',
      due_date: dueDate || null,
      board_id: boardId,
      user_id: userId || null,
      status,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    tasks.push(newTask);
    await dml.writeTasks(tasks);
    res.status(201).json({ task: newTask });
    console.log(`[INFO] New task created : ${title}`);
  } catch (err) {
    _next(err);
  }
});

// Update a task : PUT /tasks/update?id=xxx&title=yyy&description=zzz&due_date=aaa&&status=bbb
router.put('/update', async (req, res, _next) => {
  const taskId = (req.body && req.body.id) || req.query.id;
  const title = (req.body && req.body.title) || req.query.title;
  const description = (req.body && req.body.description) || req.query.description;
  const dueDate = (req.body && req.body.due_date) || req.query.due_date;
  const status = verifyStatus((req.body && req.body.status) || req.query.status);
  const updated_at = new Date().toISOString();

  try {
    const tasks = await dml.readTasks();
    const task = tasks.find((task) => parseInt(task.id) === parseInt(taskId));
    if (!task) {
      console.log('[ERROR] Task not found');
      return res.status(404).json({ error: 'Task not found' });
    }
    if (title) task.title = title;
    if (description) task.description = description;
    if (dueDate) task.due_date = dueDate;
    task.updated_at = updated_at;
    if (status) {
      task.status = status;
    }
    await dml.writeTasks(tasks);
    res.status(200).json({ task });
    console.log(`[INFO] Task updated for ID : ${taskId}`);
  } catch (err) {
    _next(err);
  }
});

// Delete a task : DELETE /tasks/delete?id=xxx
router.delete('/delete', async (req, res, _next) => {
  const taskId = (req.body && req.body.id) || req.query.id;

  try {
    const tasks = await dml.readTasks();
    const task = tasks.find((task) => parseInt(task.id) === parseInt(taskId));
    if (task) {
      const newTasks = tasks.filter((task) => parseInt(task.id) !== parseInt(taskId));
      await dml.writeTasks(newTasks);
      res.status(200).send('Task deleted');
      console.log(`[INFO] Task deleted for ID : ${taskId}`);
    } else {
      res.status(404).send('Task not found');
      console.log('[ERROR] Task not found');
    }
  } catch (err) {
    _next(err);
  }
});

// Tasks attributes :
// const taskAttributes = {
//    id: 'integer',            // Primary key
//    title: 'string',          // Title of the task
//    description: 'string',    // Description of the task
//    due_date: 'string',       // Due date of the task
//    board_id: 'integer',      // Foreign key to board
//    status: 'string',         // Status of the task
//    created_at: 'timestamp',  // Created date of the task
//    updated_at: 'timestamp'   // Updated date of the task
// };

module.exports = router;
