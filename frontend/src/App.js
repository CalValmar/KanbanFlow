import React from 'react';
import Board from './components/Board';
import './App.css';
import TaskForm from './components/TaskForm';

function App() {
  return (
    <div className="app">
      <h1>KanbanFlow</h1>
      <Board />
      <TaskForm />
    </div>
  );
}

export default App;
