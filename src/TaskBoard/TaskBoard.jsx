import React, { useState } from 'react';

const categories = ['To-Do', 'In Progress', 'Done']

const TaskBoard = () => {
    const [tasks, setTasks] = useState({
        "To-Do": [],
        "In Progress": [],
        "Done": []
    })
    return (
        <div className='grid grid-cols-3 gap-4 p-4'>
            
        </div>
    );
};

export default TaskBoard;
