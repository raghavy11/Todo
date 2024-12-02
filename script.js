// DOM Elements
const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const pendingTasksList = document.getElementById('pendingTasks');
const completedTasksList = document.getElementById('completedTasks');

// Initialize Task Arrays
let pendingTasks = JSON.parse(localStorage.getItem('pendingTasks')) || [];
let completedTasks = JSON.parse(localStorage.getItem('completedTasks')) || [];

// Save Tasks to Local Storage
function saveTasks() {
  localStorage.setItem('pendingTasks', JSON.stringify(pendingTasks));
  localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
}

// Render Tasks
function renderTasks() {
  pendingTasksList.innerHTML = '';
  completedTasksList.innerHTML = '';

  pendingTasks.forEach((task, index) => {
    pendingTasksList.innerHTML += `
      <li>
        <span>${task}</span>
        <div class="task-actions">
          <button class="complete" onclick="completeTask(${index})">Complete</button>
          <button class="edit" onclick="editTask(${index})">Edit</button>
          <button class="delete" onclick="deleteTask(${index}, 'pending')">Delete</button>
        </div>
      </li>
    `;
  });

  completedTasks.forEach((task, index) => {
    completedTasksList.innerHTML += `
      <li>
        <span>${task}</span>
        <div class="task-actions">
          <button class="delete" onclick="deleteTask(${index}, 'completed')">Delete</button>
        </div>
      </li>
    `;
  });
}

// Add New Task
taskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const newTask = taskInput.value.trim();
  if (newTask) {
    pendingTasks.push(newTask);
    saveTasks();
    renderTasks();
    taskInput.value = '';
  }
});

// Complete Task
function completeTask(index) {
  const task = pendingTasks.splice(index, 1)[0];
  completedTasks.push(task);
  saveTasks();
  renderTasks();
}

// Edit Task
function editTask(index) {
  const updatedTask = prompt('Edit Task:', pendingTasks[index]);
  if (updatedTask) {
    pendingTasks[index] = updatedTask.trim();
    saveTasks();
    renderTasks();
  }
}

// Delete Task
function deleteTask(index, type) {
  if (type === 'pending') {
    pendingTasks.splice(index, 1);
  } else {
    completedTasks.splice(index, 1);
  }
  saveTasks();
  renderTasks();
}

// Initial Render
renderTasks();
