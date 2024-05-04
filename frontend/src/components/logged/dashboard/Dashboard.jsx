import React, { useState, useEffect, useContext } from 'react';
import { readBoards, getUserID } from '../../../data/dataManagementLayer';
import { UserContext } from '../../../components/context';
import { Link } from 'react-router-dom';

import './dashboard.css';

function Dashboard() {
  const [boards, setBoards] = useState([]);
  const { username, password } = useContext(UserContext); // Get username and password from UserContext

  console.log('Username: ', username);
  console.log('Password: ', password);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = await getUserID(username, password); // Use the username and password from the UserContext
        const response = await readBoards(userId);
        if (response.board) {
          if (Array.isArray(response.board)) {
            setBoards(response.board);
          } else if (typeof response.board === 'object') {
            setBoards([response.board]);
          }
        }
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, [username, password]); // Add username and password as dependencies

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Dashboard</h1>
      
      <hr className="dashboard-separator" />
      
      <div className="dashboard-boards">
        {Array.isArray(boards) && boards.map((board, index) => (
          <Link to={`/board/${board.id}`} key={index}>
            <div className={`dashboard-board-${index}`}>
              <h2>{board.name}</h2>
              <p>Description: {board.description}</p>
              <p>Created at: {board.created_at}</p>
              <p>Updated at: {board.updated_at}</p>
            </div>
          </Link>
        ))}
      </div>

      <hr className="dashboard-separator" />

    </div>
  );
}

export default Dashboard;