import React, { useEffect, useState } from 'react';
import TaskColumn from '../TaskColumn/TaskColumn';
import TaskForm from '../TaskForm/TaskForm';
import { useAuth } from '../providers/AuthProvider';
import axios from 'axios';

const categories = ['To-Do', 'In Progress', 'Done']

const TaskBoard = () => {
    const { user } = useAuth();
    const [tasks, setTasks] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editTask, setEditTask] = useState(null);

    useEffect(() => {
        if (user?.email) {
            axios.get(`http://localhost:5000/tasks?email=${user?.email}`)
                .then((res) => setTasks(res.data))
                .catch(error => console.log('Error fetching task', error))
        }
    }, [user]);

    const handleAddTask = (newTask) => {
        setTasks([...tasks, newTask]);
        setShowForm(false);
    };

    const handleDeleteTask = (taskId) => {
        setTasks(tasks.filter(task => task._id !== taskId))
    }

    return (
        <div className='p-4'>
            <button onClick={() => setShowForm(true)} className='mb-4 bg-green-500 text-white px-4 py-1'>Add New Task</button>
            {
                showForm && (
                    <TaskForm handleAddTask={handleAddTask} user={user} task={editTask} onClose={() => {setShowForm(false); setEditTask(null)}}></TaskForm>
                )
            }
            <div className='grid grid-cols-3 gap-4 '>
                {categories.map((category) => (
                    <TaskColumn key={category} category={category} tasks={tasks.filter(task => task.category === category)} 
                    onEdit={(task)=> {setEditTask(task); setShowForm(true)}} onDelete={handleDeleteTask}></TaskColumn>
                ))}
            </div>
        </div>
    );
};

export default TaskBoard;
