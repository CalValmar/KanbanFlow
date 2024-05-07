import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { NavContext } from '../context';
import { readBoard, readTasks, createTask, deleteTask, updateTask } from '../../data/dataManagementLayer';

import './Styles/boardDetails.css';

function BoardDetails() {
    const { isOpen } = useContext(NavContext);
    const { userId, boardId } = useParams();
    const [board, setBoard] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [newTaskDescription, setNewTaskDescription] = useState('');
    const [newTaskDueDate, setNewTaskDueDate] = useState('');
    const [newTaskStatus, setNewTaskStatus] = useState('To-Do');
    const [updatingTaskId, setUpdatingTaskId] = useState(null);
    const [updatedTaskTitle, setUpdatedTaskTitle] = useState('');
    const [updatedTaskDescription, setUpdatedTaskDescription] = useState('');
    const [updatedTaskDueDate, setUpdatedTaskDueDate] = useState('');
    const [updatedTaskStatus, setUpdatedTaskStatus] = useState('');

    const [error, setError] = useState(null);
    
    useEffect(() => {
        const fetchData = async () => {
        const result = await readBoard(userId);
        const boardFromServer = result.filteredBoards[0];
        const tasksFromServer = await readTasks(boardId);
        setBoard(boardFromServer);
        setTasks(tasksFromServer);
    };
    
    fetchData();
}, [userId, boardId]);

  // Add a new task
  const handleAddTask = async (event) => {
    event.preventDefault();
    if (!newTaskTitle || !newTaskDescription || !newTaskDueDate || !newTaskStatus) {
      setError('Title, description, due date, and status are required to create a task');
      return;
    }
    const newTask = { title: newTaskTitle, description: newTaskDescription, due_date: newTaskDueDate, board_id: boardId, status: newTaskStatus };
    try {
      const taskFromServer = await createTask(newTask.title, newTask.description, newTask.due_date, newTask.board_id, newTask.status);
      console.log('Task created:', newTask.title, newTask.description, newTask.due_date, newTask.status);
      setTasks([...tasks, taskFromServer]);
      setNewTaskTitle('');
      setNewTaskDescription('');
      setNewTaskDueDate('');
      setNewTaskStatus('To-Do');
    } catch (error) {
      console.error('Error creating task:', error);
      setError(error.toString());
    }
  };

  // Remove a task
  const handleRemoveTask = async (taskId) => {
    try {
        const taskToDelete = tasks.find(task => task.id === taskId);
        if (!taskToDelete) {
            console.error('Task not found:', taskId);
            return;
        }
        await deleteTask(taskId, taskToDelete.title);
        setTasks(tasks.filter(task => task.id !== taskId));
    } catch (error) {
        console.error('Error deleting task:', error);
        setError(error.toString());
    }
  };

  // Update a task
  const handleUpdateTask = async (taskId) => {
    try {
        const updatedTask = await updateTask(taskId, updatedTaskTitle, updatedTaskDescription, updatedTaskDueDate, updatedTaskStatus);
        setTasks(tasks.map(task => task.id === taskId ? updatedTask : task));
        setUpdatingTaskId(null);
        setUpdatedTaskTitle('');
        setUpdatedTaskDescription('');
        setUpdatedTaskDueDate('');
        setUpdatedTaskStatus('');
    } catch (error) {
        console.error('Error updating task:', error);
        setError(error.toString());
    }
   };
    
    return (
    <div className={`board-details-page ${isOpen ? 'blur' : ''}`}>
        <div className="board-details">
            {/* Display the board details */}
            {board && (
                <section className="board-details__info">
                    <h1 className="board-details__title">Board Details</h1>
                    <h2 className="board-details__name">
                        <span className="label">Board : </span>
                        <span className="name">{board.name}</span>
                    </h2>
                    <p className="board-details__description">
                        <span className="label">Description : </span>
                        <span className="description">{board.description}</span>
                    </p>
                </section>
            )}
        </div>
        <hr className="tasks-divider" />
        {/* Display the tasks */}
        {tasks.length > 0 ? (
        <section className="board-details__tasks">
            <div className='task-container'>
                {/* Display the tasks to do */}
                <div className='task-column'>
                    <h2 className='task-column-title'>To-Do</h2>
                    {tasks.filter(task => task.status === 'To-Do').map(task => (
                        <article key={task.id} className="board-details__task">
                            <h2 className="board-details__task-title">
                                <span className="label">Task : </span>
                                <span className="name">{task.title}</span>
                            </h2>
                            <p className="board-details__task-description">
                                <span className="label">Description : </span>
                                <span className="description">{task.description}</span>
                            </p>
                            <p className="board-details__task-due-date">
                                <span className="label">Due Date : </span>
                                <span className="due-date">{task.due_date}</span>
                            </p>
                            <p className="board-details__task-status">
                                <span className="label">Status : </span>
                                <span className="status">{task.status}</span>
                            </p>
                            <p className="board-details__task-created-at">
                                <span className="label">Created at : </span>
                                <span className="created-at">{task.created_at}</span>
                            </p>
                            <p className="board-details__task-updated-at">
                                <span className="label">Updated at : </span>
                                <span className="updated-at">{task.updated_at}</span>
                            </p>
                            <hr className="task-divider" />
                            <button className="task-delete-button" onClick={(e) => { e.stopPropagation(); handleRemoveTask(task.id); }}>Delete</button>
                            <button className="task-update-button" onClick={(e) => { e.stopPropagation(); setUpdatingTaskId(task.id); setUpdatedTaskTitle(task.title); setUpdatedTaskDescription(task.description); setUpdatedTaskDueDate(task.due_date); setUpdatedTaskStatus(task.status); }}>Update</button>
                            { updatingTaskId === task.id && (
                            <form className="task-update-form active" onSubmit={(e) => { e.preventDefault(); handleUpdateTask(task.id); }}>
                                <input type="text" value={updatedTaskTitle} onChange={(e) => setUpdatedTaskTitle(e.target.value)} />
                                <input type="text" value={updatedTaskDescription} onChange={(e) => setUpdatedTaskDescription(e.target.value)} />
                                <input type="date" value={updatedTaskDueDate} onChange={(e) => setUpdatedTaskDueDate(e.target.value)} />
                                <select value={updatedTaskStatus} onChange={(e) => setUpdatedTaskStatus(e.target.value)}>
                                    <option value="To-Do">To-Do</option>
                                    <option value="In-Progress">In-Progress</option>
                                    <option value="Done">Done</option>
                                </select>
                                <button type="submit">Submit</button>
                            </form>
                        )}
                        </article>
                    ))}
                </div>
                {/* Display the tasks in progress */}
                <div className='task-column'>
                    <h2 className='task-column-title'>In-Progress</h2>
                    {tasks.filter(task => task.status === 'In-Progress').map(task => (
                        <article key={task.id} className="board-details__task">
                            <h2 className="board-details__task-title">
                                <span className="label">Task : </span>
                                <span className="name">{task.title}</span>
                            </h2>
                            <p className="board-details__task-description">
                                <span className="label">Description : </span>
                                <span className="description">{task.description}</span>
                            </p>
                            <p className="board-details__task-due-date">
                                <span className="label">Due Date : </span>
                                <span className="due-date">{task.due_date}</span>
                            </p>
                            <p className="board-details__task-status">
                                <span className="label">Status : </span>
                                <span className="status">{task.status}</span>
                            </p>
                            <p className="board-details__task-created-at">
                                <span className="label">Created at : </span>
                                <span className="created-at">{task.created_at}</span>
                            </p>
                            <p className="board-details__task-updated-at">
                                <span className="label">Updated at : </span>
                                <span className="updated-at">{task.updated_at}</span>
                            </p>
                            <hr className="task-divider" />
                            <button className="task-delete-button" onClick={(e) => { e.stopPropagation(); handleRemoveTask(task.id); }}>Delete</button>
                            <button className="task-update-button" onClick={(e) => { e.stopPropagation(); setUpdatingTaskId(task.id); setUpdatedTaskTitle(task.title); setUpdatedTaskDescription(task.description); setUpdatedTaskDueDate(task.due_date); setUpdatedTaskStatus(task.status); }}>Update</button>
                            { updatingTaskId === task.id && (
                            <form className="task-update-form active" onSubmit={(e) => { e.preventDefault(); handleUpdateTask(task.id); }}>
                                <input type="text" value={updatedTaskTitle} onChange={(e) => setUpdatedTaskTitle(e.target.value)} />
                                <input type="text" value={updatedTaskDescription} onChange={(e) => setUpdatedTaskDescription(e.target.value)} />
                                <input type="date" value={updatedTaskDueDate} onChange={(e) => setUpdatedTaskDueDate(e.target.value)} />
                                <select value={updatedTaskStatus} onChange={(e) => setUpdatedTaskStatus(e.target.value)}>
                                    <option value="To-Do">To-Do</option>
                                    <option value="In-Progress">In-Progress</option>
                                    <option value="Done">Done</option>
                                </select>
                                <button type="submit">Submit</button>
                            </form>
                        )}
                        </article>
                    ))}
                </div>
                {/* Display the completed tasks */}
                <div className='task-column'>
                    <h2 className='task-column-title'>Done</h2>
                    {tasks.filter(task => task.status === 'Done').map(task => (
                        <article key={task.id} className="board-details__task">
                            <h2 className="board-details__task-title">
                                <span className="label">Task : </span>
                                <span className="name">{task.title}</span>
                            </h2>
                            <p className="board-details__task-description">
                                <span className="label">Description : </span>
                                <span className="description">{task.description}</span>
                            </p>
                            <p className="board-details__task-due-date">
                                <span className="label">Due Date : </span>
                                <span className="due-date">{task.due_date}</span>
                            </p>
                            <p className="board-details__task-status">
                                <span className="label">Status : </span>
                                <span className="status">{task.status}</span>
                            </p>
                            <p className="board-details__task-created-at">
                                <span className="label">Created at : </span>
                                <span className="created-at">{task.created_at}</span>
                            </p>
                            <p className="board-details__task-updated-at">
                                <span className="label">Updated at : </span>
                                <span className="updated-at">{task.updated_at}</span>
                            </p>
                            <hr className="task-divider" />
                            <button className="task-delete-button" onClick={(e) => { e.stopPropagation(); handleRemoveTask(task.id); }}>Delete</button>
                            <button className="task-update-button" onClick={(e) => { e.stopPropagation(); setUpdatingTaskId(task.id); setUpdatedTaskTitle(task.title); setUpdatedTaskDescription(task.description); setUpdatedTaskDueDate(task.due_date); setUpdatedTaskStatus(task.status); }}>Update</button>
                            { updatingTaskId === task.id && (
                            <form className="task-update-form active" onSubmit={(e) => { e.preventDefault(); handleUpdateTask(task.id); }}>
                                <input type="text" value={updatedTaskTitle} onChange={(e) => setUpdatedTaskTitle(e.target.value)} />
                                <input type="text" value={updatedTaskDescription} onChange={(e) => setUpdatedTaskDescription(e.target.value)} />
                                <input type="date" value={updatedTaskDueDate} onChange={(e) => setUpdatedTaskDueDate(e.target.value)} />
                                <select value={updatedTaskStatus} onChange={(e) => setUpdatedTaskStatus(e.target.value)}>
                                    <option value="To-Do">To-Do</option>
                                    <option value="In-Progress">In-Progress</option>
                                    <option value="Done">Done</option>
                                </select>
                                <button type="submit">Submit</button>
                            </form>
                        )}
                        </article>
                    ))}
                </div>
            </div>
            {/* Display the errors and the form to add a task */}
            </section>
            ) : (
            <p className="board-details__no-tasks">No tasks available for this board.</p>
            )}
            {error && <p className="board-details__error">{error}</p>}
            <hr className="tasks-divider" />
            <form className="task-add-form" onSubmit={handleAddTask}>
                <input
                    type="text"
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    placeholder="Enter task title"
                    required
                    className="task-title-input"
                />
                
                <input
                    type="text"
                    value={newTaskDescription}
                    onChange={(e) => setNewTaskDescription(e.target.value)}
                    placeholder="Enter task description"
                    required
                    className="task-description-input"
                />
                
                <input
                    type="date"
                    value={newTaskDueDate}
                    onChange={(e) => setNewTaskDueDate(e.target.value)}
                    required
                    className="task-due-date-input"
                />
                
                <select
                    value={newTaskStatus}
                    onChange={(e) => setNewTaskStatus(e.target.value)}
                    required
                    className="task-status-select"
                    >
                        <option value="To-Do">To-Do</option>
                        <option value="In-Progress">In-Progress</option>
                        <option value="Done">Done</option>
                </select>
                <button type="submit" className="task-add-button">Add Task</button>
            </form>
        </div>
        );
    }

export default BoardDetails;