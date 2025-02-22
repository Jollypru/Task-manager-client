import React, { useEffect, useState } from 'react';
import TaskColumn from '../TaskColumn/TaskColumn';
import TaskForm from '../TaskForm/TaskForm';
import { useAuth } from '../providers/AuthProvider';
import axios from 'axios';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import { useFetcher } from 'react-router-dom';

const categories = ['To-Do', 'In Progress', 'Done']

const TaskBoard = () => {
    const { user } = useAuth();
    const [tasks, setTasks] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editTask, setEditTask] = useState(null);

    useEffect(() => {
        if (user?.email) {
            axios.get(`https://task-manager-server-83w7.onrender.com/tasks?email=${user?.email}`)
                .then((res) => setTasks(res.data))
                .catch(error => console.log('Error fetching task', error))
        }
    }, [user]);

    useEffect(() => {
        const ws = new WebSocket(`wss://${window.location.host}`);

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if(data.type === 'update'){
                axios.get(`https://task-manager-server-83w7.onrender.com/tasks?email=${user?.email}`)
                .then((res) => setTasks(res.data))
                .catch(error => console.log('Error fetching task', error))
            }
        }
        return () => ws.close();
    }, [user])

    const handleAddTask = (newTask) => {
        setTasks([...tasks, newTask]);
        setShowForm(false);
    };

    const handleDeleteTask = (taskId) => {
        setTasks(tasks.filter(task => task._id !== taskId))
    }

    const handleDragEnd = (result) => {
        const { source, destination } = result;
        if (!destination) return;

        if (source.index === destination.index && source.droppableId === destination.droppableId) return;

        const updatedTasks = [...tasks];
        const movedTaskIndex = updatedTasks.findIndex(task => task._id === result.draggableId)
        const [movedTask] = updatedTasks.splice(movedTaskIndex, 1);
        movedTask.category = destination.droppableId;

        updatedTasks.splice(destination.index, 0, movedTask);

        setTasks(updatedTasks);
        axios.post('https://task-manager-server-83w7.onrender.com/tasks/reorder', {tasks: updatedTasks })
        .catch(error => console.log('Error updating the task'))
    }
    return (
        <div className='p-4'>
            <button onClick={() => setShowForm(true)} className='my-4 bg-green-500 text-white px-4 py-1'>Add New Task</button>
            {
                showForm && (
                    <TaskForm handleAddTask={handleAddTask} user={user} task={editTask} onClose={() => { setShowForm(false); setEditTask(null) }}></TaskForm>
                )
            }
            <DragDropContext onDragEnd={handleDragEnd}>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-4 '>
                    {categories.map((category) => (
                        <Droppable key={category} droppableId={category}>
                        {(provided) => (
                            <TaskColumn
                                category={category}
                                tasks={tasks.filter(task => task.category === category)}
                                onEdit={(task) => { setEditTask(task); setShowForm(true); }}
                                onDelete={handleDeleteTask}
                                provided={provided}
                            />
                        )}
                    </Droppable>
                    ))}
                </div>
            </DragDropContext>
        </div>
    );
};

export default TaskBoard;
