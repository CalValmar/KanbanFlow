import React, { useState } from 'react';
import axios from 'axios';

function CreateTask({ boardId }) {
  const [taskName, setTaskName] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`/boards/${boardId}/tasks`, { name: taskName });
      console.log(response.data);
      setTaskName('');
    } catch (error) {
      console.error('Error creating task', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Task name:
        <input type="text" value={taskName} onChange={(e) => setTaskName(e.target.value)} required />
      </label>
      <button type="submit">Create Task</button>
    </form>
  );
}

export default CreateTask;