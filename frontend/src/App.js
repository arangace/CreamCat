import { useState } from 'react';
// import ToDoList from './ToDoList';
import NewToDoItem from './NewToDoItem';
import styles from './styles.css';
import NavBar from './Navbar';
import Footer from './Footer';
// A to-do list to use for testing purposes
const initialTodos = [
  { description: 'Finish lecture', isComplete: true },
  { description: 'Do homework', isComplete: false },
  { description: 'Sleep', isComplete: true }
];

function App() {
  const [todos, setTodos] = useState(initialTodos);

  function onTodoStatusChanged(index, isComplete) {
    const newTodos = [...todos];
    newTodos[index] = { ...todos[index], isComplete };//assigns property name as isComplete and the value of isComplete to the variable at the same time

    setTodos(newTodos);
    console.log("Todostatus handler");
    console.log(index, isComplete);
  }
  function handleAddTodo(description) {
    //adds new todos to the top of the list
    setTodos([
      {
        description,
        isComplete: false
      },
      ...todos

    ]);
  }
  function handleRemoveTodo(index) {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  }
  return (
    <div>
      <div>

        <NavBar>

        </NavBar>
        <ul>
          {/* TODO: Add your todo list here! */
            todos && todos.length > 0 ?
              todos.map((items, index) =>
                <div key={index} className={styles.items}>
                  <label className={items.isComplete ? styles.done : null}>
                    <li>{items.description} {items.isComplete ? <span> Done!</span> : null}</li>
                    <input type="checkbox" value={items.description} checked={items.isComplete} onChange={e => onTodoStatusChanged(index, e.target.checked)}></input>
                  </label>
                  <button onClick={() => handleRemoveTodo(index)}>Remove</button>
                </div>)
              : <p>There are no to-do items!</p>}
        </ul>
      </div>
      <div>
        <h1>Add item</h1>
        <NewToDoItem onAddTodo={handleAddTodo} />
      </div>
      <Footer></Footer>
    </div >
  );
}

export default App;