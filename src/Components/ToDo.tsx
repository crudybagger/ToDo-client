import {useState} from 'react'
import { useTodoContext } from '../Context/TodoContext'

export const ToDo = () => {
    const {todos, addTodo, removeTodo, toggleTodo } = useTodoContext();
    const [newTodo, setNewTodo] = useState('')

    return (
      <>
        <form onSubmit={(e) => {
          e.preventDefault();
          if (!newTodo) return;
          addTodo(newTodo);
          setNewTodo('');
          }}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder='Add a new todo'
        />
        <button
          type='submit'>
            Add
        </button>
        </form>
        <h2>Todos</h2>
        {todos?.filter(t => !t.completed).length > 0 ? <ul>
          {todos?.filter(t => !t.completed).map((todo, index) => (
            <li key={index}>
              {todo.task}
              <button onClick={()=>{
                toggleTodo(todo);
              }}>
              Mark as Completed
            </button>
            </li>
          ))}
        </ul> :
          <p>No Todos, Add a to do to get started</p>
        }
        <h2>Completed</h2>
        {todos.filter(t => t.completed).length > 0 ? <ul>
          {todos.filter(t => t.completed).map((todo, index) => (
            <li key={index}>
              {todo.task}
              <button onClick={()=>{
                removeTodo(todo);
                }}>
                Delete
              </button>
            </li>
          ))}
        </ul> :
          <p>No Completed Todos</p>
        }
      </>
    )
}
