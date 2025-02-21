import React from 'react';
import TaskCard from '../TaskCard/TaskCard';

const TaskColumn = ({category, tasks}) => {
    return (
        <div>
            <h2>{category}</h2>
            <div>
                {
                    tasks.map((task, index) => {
                        <TaskCard key={task._id} task={task} index={index}></TaskCard>
                    })
                }
            </div>
        </div>
    );
};

export default TaskColumn;