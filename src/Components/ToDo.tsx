import {useState} from 'react'
import { useTodoContext } from '../Context/TodoContext'
import '../styles/ToDo.css'

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
        <button type='submit'>+</button>
        </form>
        
        {todos?.length > 0 ? <div className='todo-list'>
          <h2>Todos</h2>
          {todos?.map((todo) => (
            <label key={todo._id} className={`todo ${todo.completed ? 'checked' : ''}`}>
            <input  type="checkbox" checked={todo.completed} onChange={() => {toggleTodo(todo)}}/>
            {todo.task}
            <div className='delete-button' onClick={() => { removeTodo(todo)}}><i className="fa fa-trash" aria-hidden="true" ></i></div>
            </label>
          ))}
        </div> :
          <p>No Todos, Add a to do to get started</p>
        }

      </>
    )
}
