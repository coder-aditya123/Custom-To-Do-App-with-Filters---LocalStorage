document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task');
    const taskList = document.getElementById('task-list');
    const toggleThemeBtn = document.getElementById('toggle-theme');
    const filterButtons = document.querySelectorAll('.filters button');
  
    // 🌙 Load saved theme
    if (localStorage.getItem('darkMode') === 'enabled') {
      document.body.classList.add('dark');
    }
  
    toggleThemeBtn.addEventListener('click', () => {
      document.body.classList.toggle('dark');
      const isDark = document.body.classList.contains('dark');
      localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
    });
  
    // 📦 Load tasks from localStorage
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  
    function saveTasks() {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  
    function renderTasks() {
      taskList.innerHTML = '';
      tasks.forEach((task, index) => {
        const taskDiv = document.createElement('div');
        taskDiv.classList.add('task-item');
        if (task.completed) taskDiv.classList.add('completed');
        taskDiv.innerHTML = `
          <span>${task.text}</span>
          <button class="complete-btn" data-index="${index}">✔️</button>
          <button class="delete-btn" data-index="${index}">❌</button>
        `;
        taskList.appendChild(taskDiv);
      });
    }
  
    addTaskBtn.addEventListener('click', () => {
      const taskText = taskInput.value.trim();
      if (taskText !== '') {
        tasks.push({ text: taskText, completed: false });
        saveTasks();
        renderTasks();
        taskInput.value = '';
      }
    });
  
    taskList.addEventListener('click', (e) => {
      const index = e.target.getAttribute('data-index');
      if (e.target.classList.contains('delete-btn')) {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
      } else if (e.target.classList.contains('complete-btn')) {
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
        renderTasks();
      }
    });
  
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');
        const taskItems = document.querySelectorAll('.task-item');
        taskItems.forEach(task => {
          const isCompleted = task.classList.contains('completed');
          switch (filter) {
            case 'all':
              task.style.display = 'flex';
              break;
            case 'completed':
              task.style.display = isCompleted ? 'flex' : 'none';
              break;
            case 'pending':
              task.style.display = !isCompleted ? 'flex' : 'none';
              break;
          }
        });
      });
    });
  
    // First time render
    renderTasks();
  });
  