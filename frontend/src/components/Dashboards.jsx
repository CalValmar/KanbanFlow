// Desc: Dashboards component to display the navigation links for the users, boards and tasks

import {Link, Outlet} from 'react-router-dom';

export default function Dashboards() {
    return (
        <div>
            <h1>Dashboards</h1>
            <nav>
                <ul>
                    <li><Link to="users">Users</Link></li>
                    <li><Link to="boards">Boards</Link></li>
                    <li><Link to="tasks">Tasks</Link></li>
                </ul>
            </nav>
            <Outlet />
        </div>
    )
}
