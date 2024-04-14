import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UpdateTask({ boardId, taskId }) {
  const [taskName, setTaskName] = useState('');

  useEffect(() => {
    const fetchTask = async () => {
      const response = await axios.get(`/boards/${boardId}/tasks/${taskId}`);
      setTaskName(response.data.name);
    };

    fetchTask();
  }, [boardId, taskId]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.put(`/boards/${boardId}/tasks/${taskId}`, { name: taskName });
      console.log(response.data);
    } catch (error) {
      console.error('Error updating task', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Task name:
        <input type="text" value={taskName} onChange={(e) => setTaskName(e.target.value)} required />
      </label>
      <button type="submit">Update Task</button>
    </form>
  );
}

export default UpdateTask;