import React, { useState, useEffect, useContext } from 'react';
import { createBoard, deleteBoard, getUserID, readBoards, updateBoard } from '../../../data/dataManagementLayer';
import { UserContext, NavContext } from '../../../components/context';
import { Link } from 'react-router-dom';

import './dashboard.css';

function Dashboard() {
  const { isOpen } = useContext(NavContext);
  const [boards, setBoards] = useState([]);
  const [userId, setUserId] = useState(null);
  const { username, password } = useContext(UserContext);
  const [newBoardName, setNewBoardName] = useState('');
  const [newBoardDescription, setNewBoardDescription] = useState('');
  const [updatingBoardId, setUpdatingBoardId] = useState(null);
  const [updatedBoardName, setUpdatedBoardName] = useState('');
  const [updatedBoardDescription, setUpdatedBoardDescription] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userIdFromServer = await getUserID(username, password);
        setUserId(userIdFromServer);
        const response = await readBoards(userIdFromServer);
        if (response.filteredBoards) {
          if (Array.isArray(response.filteredBoards)) {
            setBoards(response.filteredBoards);
          } else if (typeof response.filteredBoards === 'object') {
            setBoards([response.filteredBoards]);
          }
        }
      } catch (error) {
        console.error('Error fetching data', error);
        setError(error.toString());
      }
    };

    fetchData();
  }, [username, password]); // Add username and password as dependencies

  // Add a new board
  const handleAddBoard = async (event) => {
    event.preventDefault();
    if (!newBoardName || !newBoardDescription || !userId) {
      setError('Name, description and user ID are required to create a board');
      return;
    }
    const newBoard = { user_id: userId, name: newBoardName, description: newBoardDescription };
    try {
      const boardFromServer = await createBoard(newBoard.user_id, newBoard.name, newBoard.description);
      console.log('Board created:', newBoard.user_id, newBoard.name, newBoard.description);
      setBoards([...boards, boardFromServer]);
      setNewBoardName('');
      setNewBoardDescription('');
    } catch (error) {
      console.error('Error creating board:', error);
      setError(error.toString());
    }
  };

  // Remove a board
  const handleRemoveBoard = async (boardId) => {
    try {
      const boardToDelete = boards.find(board => board.id === boardId);
      if (!boardToDelete) {
        console.error('Board not found:', boardId);
        return;
      }
      await deleteBoard(boardId, boardToDelete.name); // Use the name from the boardToDelete
      setBoards(boards.filter(board => board.id !== boardId)); // Filter out the board to delete
    } catch (error) {
      console.error('Error deleting board:', error);
      setError(error.toString());
    }
  };

  // Update a board
  const handleUpdateBoard = async (boardId) => {
    try {
      const updatedBoard = await updateBoard(boardId, updatedBoardName, updatedBoardDescription);
      setBoards(boards.map(board => board.id === boardId ? updatedBoard : board));
      setUpdatingBoardId(null);
      setUpdatedBoardName('');
      setUpdatedBoardDescription('');
    } catch (error) {
      console.error('Error updating board:', error);
      setError(error.toString());
    }
  };

  return (
    <div className={`dashboard-page ${isOpen ? 'blur' : ''}`}>
      <h1 className="dashboard-title">{`Welcome on your dashboard, ${username} !`}</h1>
      <p className="dashboard-user-id">{`Your user ID is : ${userId}`}</p>
      {error && <p className="dashboard-error">{error}</p>}
      <div className="boards">
      { boards.length > 0 ? boards.map((board, index) => (
      <div className={`board board-${index}`} key={board.id}>
        <Link to={`/boards/${userId}/${board.id}`} className="board-link">
          <h2 className="board-name">
            <span className="label">Board : </span> 
            <span className="name">{board.name}</span>
          </h2>
          <p className="board-description">
            <span className="label">Description : </span> 
            <span className="description">{board.description}</span>
          </p>
          <p className="board-created-at">
            <span className="label">Created at : </span> 
            <span className="created-at">{board.created_at}</span>
          </p>
          <p className="board-updated-at">
            <span className="label">Updated at : </span> 
            <span className="updated-at">{board.updated_at}</span>
          </p>
          <hr className="board-divider" /> 
        </Link>
        <button className="board-delete-button" onClick={(e) => { e.stopPropagation(); handleRemoveBoard(board.id); }}>Delete</button>
        <button className="board-update-button" onClick={(e) => { e.stopPropagation(); setUpdatingBoardId(board.id); setUpdatedBoardName(board.name); setUpdatedBoardDescription(board.description); }}>Update</button>
        { updatingBoardId === board.id && (
          <form className="board-update-form active" onSubmit={(e) => { e.preventDefault(); handleUpdateBoard(board.id); }}>
            <input type="text" value={updatedBoardName} onChange={(e) => setUpdatedBoardName(e.target.value)} />
            <input type="text" value={updatedBoardDescription} onChange={(e) => setUpdatedBoardDescription(e.target.value)} />
            <button type="submit">Submit</button>
          </form>
        )}
      </div>
      )) : <p className="boards-empty-message">No boards to display</p>}
      </div>
      <hr className="dashboard-divider" />
      <form className="board-add-form" onSubmit={handleAddBoard}>
        <input
          type="text"
          value={newBoardName}
          onChange={(e) => setNewBoardName(e.target.value)}
          placeholder="Enter board name"
          required
          className="board-name-input"
        />
        <input
          type="text"
          value={newBoardDescription}
          onChange={(e) => setNewBoardDescription(e.target.value)}
          placeholder="Enter board description"
          required
          className="board-description-input"
        />
        <button type="submit" className="board-add-button">Add Board</button>
      </form>
    </div>
  );
}

export default Dashboard;