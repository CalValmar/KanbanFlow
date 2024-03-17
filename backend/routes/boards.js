const express = require('express');
const dml = require('../data/dataManagementLayer');
const authenticatedToken = require('./users.js');

const router = express.Router();

// Get all boards : GET /boards/list
router.get('/list', async (req, res, next) => {
    const boards = await dml.readBoards();
    res.json({boards})
    console.log('[INFO] All boards retrieved');
});

// Get boards from : id, name, user_id : GET /boards/?id=xxx&name=yyy&user_id=zzz
router.get('/', async (req, res, next) => {
    const boardId = req.query.id;
    const boardName = req.query.name;
    const userId = req.query.user_id;

    try { // Retrieve the board by the board ID or name or user ID
        const boards = await dml.readBoards();
        const board = boards.find(board => parseInt(board.id) === parseInt(boardId) || board.name === boardName || parseInt(board.user_id) === parseInt(userId));
        if (!board) {
            return res.status(404).json({ error: "Board not found" });
        }
        res.json({board});
        if (boardId) console.log('[INFO] Board retrieved for ID : ' + boardId);
        if (boardName) console.log('[INFO] Board retrieved for name : ' + boardName);
        if (userId) console.log('[INFO] Board retrieved for user ID : ' + userId);
    } catch (error) {
        console.error("[ERROR]", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


// Create a new board : POST /boards/create?name=board_name
router.post('/create', authenticatedToken ,async (req, res, next) => {
    const existedBoards = await dml.readBoards();

    const newBoard = {
        id: existedBoards.length + 1,
        name: req.query.name,
        user_id: authenticatedToken.id, // Get the user_id from the token --> don't work !! 
        created_at: new Date().toISOString()
    }
    const allBoards = [...existedBoards, newBoard];
    await dml.writeBoards(allBoards);
    res.json({newBoard});
    console.log('[INFO] New board created : ' + req.query.name);
});

// Delete a board : id or name : DELETE /boards/delete?id=xxx&name=yyy
router.delete('/delete', async (req, res, next) => {
    const boardId = req.query.id;
    const boardName = req.query.name;

    const existedBoards = await dml.readBoards();
    const board = existedBoards.find(board => parseInt(board.id) === parseInt(boardId) || board.name === boardName);
    if (!board) {
        return res.status(404).json({ error: "Board not found" });
    }
    const index = existedBoards.indexOf(board);
    existedBoards.splice(index, 1);
    await dml.writeBoards(existedBoards);
    res.status(200).send('Board deleted');
    if (boardId) console.log('[INFO] Board deleted for ID : ' + boardId);
    if (boardName) console.log('[INFO] Board deleted for name : ' + boardName);
});

// Update a name of a board by id : PUT /boards/update?id=xxx&name=yyy
router.put('/update', async (req, res, next) => {
    const boardId = req.query.id;
    const boardName = req.query.name;

    const existedBoards = await dml.readBoards();
    const board = existedBoards.find(board => parseInt(board.id) === parseInt(boardId));
    if (!board) {
        return res.status(404).json({ error: "Board not found" });
    }
    const allBoards = existedBoards.map(board => {
        if (parseInt(board.id) === parseInt(boardId) || board.name === boardName){
            return {
                ...board,
                name: boardName || board.name
            }
        }
        return board;
    });
    await dml.writeBoards(allBoards);
    res.json({board});
    console.log('[INFO] Board updated for ID : ' + boardId + ' with name : ' + boardName);
});


module.exports = router;