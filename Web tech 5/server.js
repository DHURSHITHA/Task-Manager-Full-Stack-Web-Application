const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { title } = require('process');

const app = express();
app.use(cors()); 
app.use(bodyParser.json());

let tasks = [
    {
        id: 1,
        title: "hello"
    }
]; // Simple in-memory storage

// Get all tasks
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// Add a task
app.post('/tasks', (req, res) => {
    const { title } = req.body;
    const newTask = { id: tasks.length + 1, title };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

// Delete a task
app.delete('/tasks/:id', (req, res) => {
    tasks = tasks.filter(t => t.id != req.params.id);
    res.json({ message: "Task deleted" });
});

// Start server
app.listen(3000, () => console.log("Server running on port 3000"));
