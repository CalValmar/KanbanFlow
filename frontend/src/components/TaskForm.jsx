import React, { useState } from 'react';

function AddNewTask() {
  const [taskTitle, setTaskTitle] = useState('');

  const handleAddTask = (event) => {
    event.preventDefault();
    console.log('Task title:', taskTitle); // Log the task title
    setTaskTitle(''); // Clear the input field
  };

  return (
    <div className="task-form">
      <h3>Add New Task</h3>
      <form onSubmit={handleAddTask}>
        <input type="text" placeholder="Task title" value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default AddNewTask;