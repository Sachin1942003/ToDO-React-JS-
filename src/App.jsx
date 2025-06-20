import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import './App.css';

function App() {
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);

  const onInput = (e) => {
    setTodo(e.target.value);
  };

  const onAdd = () => {
    if (!todo.trim()) return;
    setTodoList([...todoList, { id: uuid(), todo: todo, isComplete: false }]);
     setTodo("");
   
  };

  const onDelete = (id) => {
    const updateList = todoList.filter(todo => todo.id !== id);
    setTodoList(updateList);
  };

  const onCheck = (id) => {
    const updateList = todoList.map(todo =>
      todo.id === id ? { ...todo, isComplete: !todo.isComplete } : todo
    );
    setTodoList(updateList);
  };

  return (
    <div className="app-container">
      <div className="header">
        <h2>TODO-LIST</h2>
        <div className="input-group">
          <input
            value={todo}
            onChange={onInput}
            placeholder='Enter a task'
            className="todo-input"
          />
          <button onClick={onAdd} className="add-button">
            Add
          </button>
        </div>
      </div>
      <div className="todo-list">
        {todoList?.map(item => (
          <div key={item.id} className="todo-item">
            <input
              type="checkbox"
              checked={item.isComplete}
              onChange={() => onCheck(item.id)}
              className="todo-checkbox"
            />
            <span className={`todo-text ${item.isComplete ? 'completed' : ''}`}>
              {item.todo}
            </span>
            <button 
              onClick={() => onDelete(item.id)}
              className="delete-button"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;