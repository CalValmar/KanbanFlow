import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { readBoards, readTasks } from '../../../../data/dataManagementLayer';

function BoardDetails() {
  const [board, setBoard] = useState(null);
  const [tasks, setTasks] = useState([]);
  const { id } = useParams(); // Access route parameters with useParams

  useEffect(() => {
    const fetchData = async () => {
      const boardFromServer = await readBoards(id);
      const tasksFromServer = await readTasks(id);
      setBoard(boardFromServer);
      setTasks(tasksFromServer);
    };

    fetchData();
  }, [id]);

  return (
    <div className="board-details">
        {board && (
        <section className="board-details__info">
            <h1 className="board-details__title">Board Details</h1>
            <h2 className="board-details__name">Board Name: {board.name}</h2>
            <p className="board-details__description">Description: {board.description}</p>
        </section>
        )}
        {tasks.length > 0 ? (
        <section className="board-details__tasks">
            <h1 className="board-details__tasks-title">Tasks</h1>
            {tasks.map(task => (
            <article key={task.id} className="board-details__task">
                <h2 className="board-details__task-title">Task Title: {task.title}</h2>
                <p className="board-details__task-description">Description: {task.description}</p>
            </article>
            ))}
        </section>
        ) : (
        <p className="board-details__no-tasks">No tasks available for this board.</p>
        )}
    </div> );
}

export default BoardDetails;