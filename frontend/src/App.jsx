// frontend/src/App.jsx
import { useState, useEffect } from 'react';
import * as api from './api';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const { data } = await api.getTasks();
    setTasks(data);
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!input) return;
    const { data: newTask } = await api.createTask({ title: input });
    setTasks([newTask, ...tasks]);
    setInput('');
  };

  const handleToggleComplete = async (task) => {
    const { data: updatedTask } = await api.updateTask(task._id, { completed: !task.completed });
    setTasks(tasks.map((t) => (t._id === task._id ? updatedTask : t)));
  };

  const handleDelete = async (id) => {
    await api.deleteTask(id);
    setTasks(tasks.filter((t) => t._id !== id));
  };

  return (
    <div className="app">
      <h1>To-Do List ✅</h1>
      <form onSubmit={handleAddTask}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a new task..."
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {tasks.map((task) => (
          <li key={task._id} className={task.completed ? 'completed' : ''}>
            <span onClick={() => handleToggleComplete(task)}>
              {task.title}
            </span>
            <button onClick={() => handleDelete(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;