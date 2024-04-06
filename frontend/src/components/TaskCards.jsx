// Desc: TaskCards component to display task information

import StatusInfo from "./StatusInfo";
import { Link } from "react-router-dom";

export default function TaskCards({id, title, description, due_date, status, board_id, user_id, created_at}) {
    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">Task {id} : {title}</h5>
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">Description: {description}</li>
                <li className="list-group-item">Due Date: {due_date}</li>
                <li className="list-group-item">Status: <StatusInfo status={status} /></li>
                <li className="list-group-item">Board ID: {board_id}</li>
                <li className="list-group-item">User ID: {user_id}</li>
                <li className="list-group-item">Created At: {created_at}</li>
            </ul>
            <div className="card-body">
                <Link to={`/tasks/${id}`} className="card-link">View Task</Link>
            </div>
        </div>
    );
}
               