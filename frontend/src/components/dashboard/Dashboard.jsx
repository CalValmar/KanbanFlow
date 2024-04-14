import React, { useState, useEffect } from 'react';
import { readBoards, getUserID } from '../../data/dataManagementLayer';

function Dashboard() {
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = await getUserID("Gus", "dead");
        const response = await readBoards(userId);
        if (response.board && typeof response.board === 'object') {
          // Wrap the board object in an array and set it to the boards state
          setBoards([response.board]);
        }
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, []);

 return (
  <div className="dashboard">
    <h1>Dashboard</h1>
    <div className="boards">
      {Array.isArray(boards) && boards.map((board, index) => (
        <div className={`board-${index}`} key={index}>
          <h2>{board.name}</h2>
          <p>Description: {board.description}</p>
          <p>Created at: {board.created_at}</p>
          <p>Updated at: {board.updated_at}</p>
        </div>
      ))}
    </div>
  </div>
  );
}


export default Dashboard;