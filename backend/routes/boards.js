const express = require('express');
const dml = require('../data/dataManagementLayer.js');
const authenticateUser = require('./users.js');

const router = express.Router();

// Get all boards : GET /boards/list
router.get('/list', async (req, res, next) => {
    try {
        const boards = await dml.readBoards();
        res.json({boards});
        console.log('[INFO] All boards retrieved');
    } catch (error) {
        console.error("[ERROR]", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Get boards from : id, name, user_id : GET /boards/?id=xxx&name=yyy&user_id=zzz
router.get('/', async (req, res) => {
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


// Create a new board : POST /boards/create?name=board_name&description=board_description
router.post('/create', authenticateUser, async (req, res) => {
    try {
        const existedBoards = await dml.readBoards();
        const userId = req.session.userId;
        
        const name = req.query.name;
        const description = req.query.description;
        
        if (!name || !description) {
            return res.status(400).json({ error: "Missing parameters" });
        }
        
        const newBoard = {
            id: existedBoards.length + 1, 
            name: name,
            description: description,
            user_id: userId,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        }
        const allBoards = [...existedBoards, newBoard];
        await dml.writeBoards(allBoards);
        res.json({newBoard});
        console.log('[INFO] New board created : ' + name);
    } catch (error) {
        console.error("[ERROR]", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Delete a board : id or name : DELETE /boards/delete?id=xxx&name=yyy
router.delete('/delete', async (req, res, next) => {
    try {
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
    } catch (error) {
        console.error("[ERROR]", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Update a name or desc. of a board by id : PUT /boards/update?id=xxx&name=yyy&description=zzz
router.put('/update', async (req, res) => {
    try {
        const boardId = req.query.id;
        const boardName = req.query.name;
        const boardDescription = req.query.description;

        const existedBoards = await dml.readBoards();
        const board = existedBoards.find(board => parseInt(board.id) === parseInt(boardId));
        if (!board) {
            return res.status(404).json({ error: "Board not found" });
        }
        const allBoards = existedBoards.map(board => {
            if (parseInt(board.id) === parseInt(boardId) || board.name === boardName){
                return {
                    ...board,
                    name: boardName || board.name,
                    description: boardDescription || board.description,
                    updated_at: new Date().toISOString()
                }
            }
            return board;
        });
        await dml.writeBoards(allBoards);
        res.json({board});
        console.log('[INFO] Board updated for ID : ' + boardId + ' and name : ' + boardName + ' and description : ' + boardDescription);
    } catch (error) {
        console.error("[ERROR]", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


// Boards attributes : 
//const boardAttributes = {
//    id: 'integer',          // Primary key
//    name: 'string',         // Name of the board
//    description: 'string',  // Description of the board
//    user_id: 'integer',     // User ID of the board owner
//    created_at: 'string',   // Created date of the board
//    updated_at: 'string'    // Updated date of the board
//};

module.exports = router;