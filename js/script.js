// Get the form, input, and list elements from the DOM
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

// Load tasks from localStorage, or start with an empty array
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Function to display all tasks in the list
function renderTasks() {
    // Clear the current list
    taskList.innerHTML = '';
    // Loop through each task and create a list item
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        // If task is completed, add the completed class
        if (task.completed) {
            li.classList.add('completed');
        }
        // Set the inner HTML for the task item
        li.innerHTML = `
            <span class="task-text">${task.text}</span>
            <button class="delete-btn" data-index="${index}">Delete</button>
        `;
        // Add click event to toggle completion
        li.addEventListener('click', () => toggleComplete(index));
        // Append the item to the list
        taskList.appendChild(li);
    });
}

// Function to add a new task
function addTask(text) {
    // Add the new task to the array
    tasks.push({ text, completed: false });
    // Save to localStorage
    saveTasks();
    // Re-render the list
    renderTasks();
}

// Function to toggle a task's completion status
function toggleComplete(index) {
    // Flip the completed flag
    tasks[index].completed = !tasks[index].completed;
    // Save changes
    saveTasks();
    // Re-render
    renderTasks();
}

// Function to delete a task
function deleteTask(index) {
    // Remove the task from the array
    tasks.splice(index, 1);
    // Save changes
    saveTasks();
    // Re-render
    renderTasks();
}

// Function to save tasks to localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Event listener for form submission
taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = taskInput.value.trim();
    if (text) {
        addTask(text);
        taskInput.value = '';
    }
});

// Event listener for delete button clicks
taskList.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
        const index = e.target.getAttribute('data-index');
        deleteTask(index);
    }
});

// Initial render of tasks when the page loads
renderTasks();