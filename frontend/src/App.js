import './App.css';
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Dashboards from './components/Dashboards';
import Users from './components/Users';
import Boards from './components/Boards';
import Tasks from './components/Tasks';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Dashboards />,
      children: [
        { index: true, element: <Users /> },
        { path: 'users', element: <Users /> },
        { path: 'boards', element: <Boards /> },
        { path: 'tasks', element: <Tasks /> },
      ]
    }
  ]
);


function App() {
  return (
    <RouterProvider router={router}></RouterProvider>
  );
}


export default App;
