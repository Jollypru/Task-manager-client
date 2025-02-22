import React from 'react';
import TaskCard from '../TaskCard/TaskCard';

const TaskColumn = ({ category, tasks, onEdit, onDelete, provided }) => {
    return (
        
        <div ref={provided.innerRef} {...provided.droppableProps} className="bg-gray-100 p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-gray-700 mb-4">{category}</h2>
        <div className="space-y-4">
            {
                tasks.length > 0 ? (
                    tasks.map((task, index) => <TaskCard key={task._id} task={task} onEdit={onEdit} onDelete={onDelete} index={index}></TaskCard>)
                ) : (
                    <p className="text-gray-500">No tasks available</p>
                )
            }
        </div>
        {provided.placeholder}
    </div>
    );
};

export default TaskColumn;