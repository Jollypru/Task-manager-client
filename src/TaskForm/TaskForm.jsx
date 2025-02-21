import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const TaskForm = ({ user, task, handleAddTask, onClose }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('To-Do');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (task) {
            setTitle(task.title);
            setDescription(task.description);
            setCategory(task.category);
        }
    }, [task]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user?.email) {
            console.error('User email is required');
            return;
        }

        const newTask = {
            title, description, category, userEmail: user?.email
        }
        setLoading(true);

        try {
            if(task){
                await axios.put(`http://localhost:5000/tasks/${task._id}`, newTask);
                toast.success("Task updated successfully!");
            }else{
                const response = await axios.post('http://localhost:5000/tasks', newTask);
                handleAddTask(response.data.task);
                toast.success('New task added!')
            }
           onClose();
        } catch (error) {
            console.log('Error adding task', error);
        } finally {
            setLoading(false);
        }
    }
    return (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
            <div className='bg-white shadow-lg p-5 rounded-md w-96'>
                <h2 className='text-3xl text-blue-500'>{task ? "Edit Task" : "Add a New Task"}</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-4'>
                        <label className='block mb-2'>Title</label>
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} maxLength={50} required className='w-full p-2 border' />
                    </div>
                    <div className='mb-4'>
                        <label className='block mb-2'>Description</label>
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} maxLength={200} className='w-full p-2 border'></textarea>
                    </div>
                    <div className='mb-4'>
                        <label className='block mb-2'>Category</label>
                        <select value={category} onChange={(e) => setCategory(e.target.value)} className='w-full p-2 border'>
                            <option value="To-Do">To-Do</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Done">Done</option>
                        </select>
                    </div>
                    <div className='flex items-center gap-5'>
                        <button onClick={onClose} className="px-4 py-2 bg-gray-400 text-white rounded">Cancel</button>
                        <button type='submit' disabled={loading} className="px-4 py-2 bg-blue-500 text-white rounded">{task ? "Update" : "Add"}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TaskForm;