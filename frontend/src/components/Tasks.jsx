// This component is for the tasks page
// It is a child of the Dashboards component
// It is a sibling of the Users and Boards components

import TaskCards from './TaskCards';
import {useEffect, useState} from 'react';

const dml = require("../data/dataManagementLayer");

export default function Tasks() {
    const [tasksData, setTasksData] = useState([]);
    
    useEffect(() => {
        dml.tasksList().then((items) => setTasksData(items)) }, []);

    return (
        <div className="row">
            <div className="card-group">
                {
                    tasksData.map((item) => 
                        <TaskCards id={item.id}
                            title={item.title}
                            description={item.description}
                            due_date={item.due_date}
                            status={item.status}
                            board_id={item.board_id}
                            user_id={item.user_id}
                            created_at={item.created_at}
                        />
                    )
                }
            </div>
        </div>

    )
}