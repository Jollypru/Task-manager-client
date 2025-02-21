import React, { useState } from 'react';
import TaskColumn from '../TaskColumn/TaskColumn';
import TaskForm from '../TaskForm/TaskForm';
import { useAuth } from '../providers/AuthProvider';

const categories = ['To-Do', 'In Progress', 'Done']

const TaskBoard = () => {
    const {user} = useAuth();
    const [tasks, setTasks] = useState([])
    const [showForm, setShowForm] = useState(false);

    const handleAddTask = (newTask) => {
        setTasks((prevTask) => [...prevTask, newTask]);
        setShowForm(false);
    }
    return (
        <div className='p-4'>
            <button onClick={() => setShowForm(true)}  className='mb-4 bg-green-500 text-white px-4 py-1'>Add New Task</button>
            {
                showForm && (
                    <TaskForm handleAddTask={handleAddTask} user={user} onclose={() => setShowForm(false)}></TaskForm>
                )
            }
            <div className='grid grid-cols-3 gap-4 '>
            {
                categories.map((category) => {
                    <TaskColumn key={category} category={category} tasks={tasks[category]}></TaskColumn>
                })
            }
            </div>            
           
        </div>
    );
};

export default TaskBoard;
