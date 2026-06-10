const express = require('express');
const dml = require('../data/dataManagementLayer.js');

const router = express.Router();

// Get all boards : GET /boards/list
router.get('/list', async (req, res, _next) => {
  try {
    const boards = await dml.readBoards();
    res.json({ boards });
    console.log('[INFO] All boards retrieved');
  } catch (error) {
    console.error('[ERROR]', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get boards from : id, name, user_id : GET /boards/?id=xxx&name=yyy&user_id=zzz
router.get('/', async (req, res) => {
  const boardId = req.query.id;
  const boardName = req.query.name;
  const userId = req.query.user_id;

  try {
    const boards = await dml.readBoards();
    let filtered = boards;
    if (boardId) filtered = filtered.filter((b) => parseInt(b.id) === parseInt(boardId));
    if (boardName) filtered = filtered.filter((b) => b.name === boardName);
    if (userId) filtered = filtered.filter((b) => parseInt(b.user_id) === parseInt(userId));

    if (!filtered || filtered.length === 0) {
      return res.status(404).json({ error: 'No boards found' });
    }
    res.json({ boards: filtered });
    if (boardId) console.log(`[INFO] Boards retrieved for ID : ${boardId}`);
    if (boardName) console.log(`[INFO] Boards retrieved for name : ${boardName}`);
    if (userId) console.log(`[INFO] Boards retrieved for user ID : ${userId}`);
  } catch (error) {
    console.error('[ERROR]', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create a new board : POST /boards/create?user_id=0&name=board_name&description=board_description
router.post('/create', async (req, res) => {
  try {
    const existedBoards = await dml.readBoards();
    const userId = (req.session && req.session.userId) ? parseInt(req.session.userId) : (req.body && req.body.user_id ? parseInt(req.body.user_id) : (req.query.user_id ? parseInt(req.query.user_id) : null));
    const name = (req.body && (req.body.name || req.body.title)) || (req.query && (req.query.name || req.query.title));
    const description = (req.body && req.body.description) || req.query.description || '';

    // allow anonymous boards (no user) but require a name/title
    if (!name) {
      return res.status(400).json({ error: 'Missing parameters: name or title required' });
    }

    const nextId = existedBoards.length > 0 ? Math.max(...existedBoards.map((b) => parseInt(b.id) || 0)) + 1 : 1;
    const newBoard = {
      id: nextId,
      name,
      description,
      user_id: userId || null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    const allBoards = [...existedBoards, newBoard];
    await dml.writeBoards(allBoards);
    res.json({ newBoard });
    console.log(`[INFO] New board created : ${name}`);
  } catch (error) {
    console.error('[ERROR]', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a board : id or name : DELETE /boards/delete?id=xxx&name=yyy
router.delete('/delete', async (req, res, _next) => {
  try {
    const boardId = (req.body && req.body.id) || req.query.id;
    const boardName = (req.body && req.body.name) || req.query.name;

    const existedBoards = await dml.readBoards();
    const board = existedBoards.find((b) => (boardId && parseInt(b.id) === parseInt(boardId)) || (boardName && b.name === boardName));
    if (!board) {
      return res.status(404).json({ error: 'Board not found' });
    }
    const remaining = existedBoards.filter((b) => !((boardId && parseInt(b.id) === parseInt(boardId)) || (boardName && b.name === boardName)));
    await dml.writeBoards(remaining);
    res.status(200).json({ message: 'Board deleted' });
    if (boardId) console.log(`[INFO] Board deleted for ID : ${boardId}`);
    if (boardName) console.log(`[INFO] Board deleted for name : ${boardName}`);
  } catch (error) {
    console.error('[ERROR]', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update a name or desc. of a board by id : PUT /boards/update?id=xxx&name=yyy&description=zzz
router.put('/update', async (req, res) => {
  try {
    const boardId = (req.body && req.body.id) || req.query.id;
    const boardName = (req.body && req.body.name) || req.query.name;
    const boardDescription = (req.body && req.body.description) || req.query.description;

    if (!boardId) return res.status(400).json({ error: 'Missing board id' });

    const existedBoards = await dml.readBoards();
    const board = existedBoards.find((b) => parseInt(b.id) === parseInt(boardId));
    if (!board) {
      return res.status(404).json({ error: 'Board not found' });
    }
    const allBoards = existedBoards.map((b) => {
      if (parseInt(b.id) === parseInt(boardId)) {
        return {
          ...b,
          name: boardName || b.name,
          description: boardDescription || b.description,
          updated_at: new Date().toISOString(),
        };
      }
      return b;
    });
    await dml.writeBoards(allBoards);
    res.json({ board: allBoards.find((b) => parseInt(b.id) === parseInt(boardId)) });
    console.log(`[INFO] Board updated for ID : ${boardId} and name : ${boardName} and description : ${boardDescription}`);
  } catch (error) {
    console.error('[ERROR]', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Boards attributes :
// const boardAttributes = {
//    id: 'integer',            // Primary key
//    name: 'string',           // Name of the board
//    description: 'string',    // Description of the board
//    user_id: 'integer',       // User ID of the board owner
//    created_at: 'timestamp',  // Created date of the board
//    updated_at: 'timestamp'   // Updated date of the board
// };

module.exports = router;
