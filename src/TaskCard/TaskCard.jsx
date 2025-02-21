import React from 'react';

const TaskCard = ({task}) => {
    return (
        <div className="bg-white shadow-md p-4 rounded-lg">
            <h3 className="text-lg font-semibold">{task.title}</h3>
            {task.description && <p className="text-gray-600 mt-2">{task.description}</p>}
            <p className="text-sm text-gray-400 mt-2">Added: {new Date(task.timeStamp).toLocaleString()}</p>
            <div className='flex items-center justify-between mt-2'>
                <button className='text-sky-600'>Edit</button>
                <button className='text-red-600'>Delete</button>
            </div>
        </div>
    );
};

export default TaskCard;