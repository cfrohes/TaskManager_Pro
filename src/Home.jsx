import React, { useState, useEffect } from 'react';

function Home() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState({ 
    todo: [], 
    ongoing: [], 
    completed: [] 
  });
  const [motivationalQuote, setMotivationalQuote] = useState('');

  // Motivational Quotes Array
  const motivationalQuotes = [
    "Every journey begins with a single step 🥾🌄👣",
    "Small progress is still progress 🌱🌿📈", 
    "Believe in yourself ✨💪🪞",
    "One task at a time 📝☑️⏳",
    "You've got this! 🌟🔥🙌"
  ];

  // Select Random Motivational Quote on Component Mount
  useEffect(() => {
    const randomQuote = motivationalQuotes[
      Math.floor(Math.random() * motivationalQuotes.length)
    ];
    setMotivationalQuote(randomQuote);
  }, []);

  // Handle input change
  const handleInputChange = (e) => {
    setTask(e.target.value);
  };

  // Add task to "To-Do" section
  const addTask = () => {
    if (task.trim() !== '') {
      setTasks((prevTasks) => ({
        ...prevTasks,
        todo: [...prevTasks.todo, {
          id: Date.now(),
          text: task,
          showDropdown: false
        }],
      }));
      setTask('');
    } else {
      alert('Task cannot be empty!');
    }
  };

  // Toggle Dropdown
  const toggleDropdown = (category, taskId) => {
    setTasks((prevTasks) => ({
      ...prevTasks,
      [category]: prevTasks[category].map(task => 
        task.id === taskId 
          ? {...task, showDropdown: !task.showDropdown} 
          : {...task, showDropdown: false}
      )
    }));
  };

  // Move task to another category
  const moveTask = (currentCategory, targetCategory, taskToMove) => {
    setTasks((prevTasks) => {
      const updatedCurrent = prevTasks[currentCategory].filter(
        (t) => t.id !== taskToMove.id
      );

      const updatedTarget = [...prevTasks[targetCategory], {
        ...taskToMove,
        showDropdown: false
      }];

      return {
        ...prevTasks,
        [currentCategory]: updatedCurrent,
        [targetCategory]: updatedTarget,
      };
    });
  };

  // Delete task
  const deleteTask = (category, taskToDelete) => {
    setTasks((prevTasks) => ({
      ...prevTasks,
      [category]: prevTasks[category].filter(
        (task) => task.id !== taskToDelete.id
      )
    }));
  };

  return (
    <div className="home">
      {/* Motivational Header */}
      <div className="motivational-header">
        <h1>Task Management Dashboard</h1>
        <p className="quote">{motivationalQuote}</p>
      </div>

      {/* Form to add a task */}
      <form
        className="task-form"
        onSubmit={(e) => {
          e.preventDefault();
          addTask();
        }}
      >
        <input
          type="text"
          placeholder="Enter task..."
          className="task-input"
          value={task}
          onChange={handleInputChange}
        />
        <button
          type="button"
          className="add-task-button"
          onClick={addTask}
        >
          ADD TASK
        </button>
      </form>

      {/* Task Sections */}
      <div className="task-sections">
        {/* To-Do Section */}
        <div className="task-section" data-category="todo">
          <h2>To-Do Tasks</h2>
          <ul>
            {tasks.todo.map((task) => (
              <li key={task.id} className="task-item">
                <div className="task-content">
                  {task.text}
                  <button 
                    className="dropdown-toggle"
                    onClick={() => toggleDropdown('todo', task.id)}
                  >
                    ▼
                  </button>
                  
                  {task.showDropdown && (
                    <div className="dropdown-menu">
                      <button 
                        onClick={() => moveTask('todo', 'ongoing', task)}
                      >
                        Move to Ongoing
                      </button>
                      <button 
                        onClick={() => moveTask('todo', 'completed', task)}
                      >
                        Move to Completed
                      </button>
                      <button 
                        onClick={() => deleteTask('todo', task)}
                        className="delete-btn"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Ongoing Section */}
        <div className="task-section" data-category="ongoing">
          <h2>Ongoing Tasks</h2>
          <ul>
            {tasks.ongoing.map((task) => (
              <li key={task.id} className="task-item">
                <div className="task-content">
                  {task.text}
                  <button 
                    className="dropdown-toggle"
                    onClick={() => toggleDropdown('ongoing', task.id)}
                  >
                    ▼
                  </button>
                  
                  {task.showDropdown && (
                    <div className="dropdown-menu">
                      <button 
                        onClick={() => moveTask('ongoing', 'todo', task)}
                      >
                        Move to To-Do
                      </button>
                      <button 
                        onClick={() => moveTask('ongoing', 'completed', task)}
                      >
                        Move to Completed
                      </button>
                      <button 
                        onClick={() => deleteTask('ongoing', task)}
                        className="delete-btn"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Completed Section */}
        <div className="task-section" data-category="completed">
          <h2>Completed Tasks</h2>
          <ul>
            {tasks.completed.map((task) => (
              <li key={task.id} className="task-item">
                <div className="task-content">
                  {task.text}
                  <button 
                    className="dropdown-toggle"
                    onClick={() => toggleDropdown('completed', task.id)}
                  >
                    ▼
                  </button>
                  
                  {task.showDropdown && (
                    <div className="dropdown-menu">
                      <button 
                        onClick={() => moveTask('completed', 'todo', task)}
                      >
                        Move to To-Do
                      </button>
                      <button 
                        onClick={() => moveTask('completed', 'ongoing', task)}
                      >
                        Move to Ongoing
                      </button>
                      <button 
                        onClick={() => deleteTask('completed', task)}
                        className="delete-btn"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Home;
