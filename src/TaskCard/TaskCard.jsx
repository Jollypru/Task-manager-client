import axios from 'axios';
import React from 'react';
import { toast } from 'react-toastify';

const TaskCard = ({task, onEdit, onDelete}) => {
    const handleDelete = async() => {
        try{
            await axios.delete(`http://localhost:5000/tasks/${task._id}`)
            toast.success('Task deleted!');
            onDelete(task._id)
        }catch(error){
            toast.error('Error deleting task')
        }
    }
    return (
        <div className="bg-white shadow-md p-4 rounded-lg">
            <h3 className="text-lg font-semibold">{task.title}</h3>
            {task.description && <p className="text-gray-600 mt-2">{task.description}</p>}
            <p className="text-sm text-gray-400 mt-2">Added: {new Date(task.timeStamp).toLocaleString()}</p>
            <div className='flex items-center justify-between mt-2'>
                <button onClick={() => onEdit(task)} className='text-sky-600'>Edit</button>
                <button onClick={handleDelete} className='text-red-600'>Delete</button>
            </div>
        </div>
    );
};

export default TaskCard;