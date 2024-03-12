import React from 'react';
import Card from './Card';

function Board() {
  return (
    <div className="board">
      <h2>My Kanban Board</h2>
      <div className="card-list">
        <Card title="Task 1" />
        <Card title="Task 2" />
        <Card title="Task 3" />
        <Card title="Task 4" />
        <Card title="Task 5" />
        <Card title="Task 6" />
      </div>
    </div>
  );
}

export default Board;
