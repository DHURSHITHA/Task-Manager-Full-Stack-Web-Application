const taskTitle = document.getElementById("task-title");
const taskList = document.getElementById("task-list");

// Fetch tasks on page load
window.onload = async () => {
    await getTasks();
};

// Fetch tasks from API
const getTasks = async () => {
    const response = await fetch("http://localhost:3000/tasks");
    const tasks = await response.json();
    taskList.innerHTML = ""; // Clear task list before appending
    tasks.forEach(task => {
        appendTask(task);
    });
};

// Add task to API
const addTask = async () => {
    const title = taskTitle.value;
    if (!title) return;

    const response = await fetch("http://localhost:3000/tasks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
    });
    const newTask = await response.json();
    appendTask(newTask);
    taskTitle.value = "";
};

// Append task to UI
const appendTask = (task) => {
    const li = document.createElement("li");
    li.innerHTML = `
        <span>${task.title}</span>
        <button onclick="deleteTask(${task.id})">Delete</button>
    `;
    taskList.appendChild(li);
};

// Delete task from API
const deleteTask = async (id) => {
    await fetch(`http://localhost:3000/tasks/${id}`, {
        method: "DELETE",
    });
    getTasks(); // Refresh task list after deletion
};
