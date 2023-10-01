import { createContext, useContext, useState, useEffect } from'react'
import { useAuth } from './AuthContext'
import { usePost, useGet } from '../Hooks/useApi'

type ToDo = {
    _id: string,
    task: string,
    completed: boolean
}
type TodoContextType = {
    todos: ToDo[]
    addTodo: (todo: string) => void
    removeTodo: (todo: ToDo) => void
    toggleTodo: (todo: ToDo) => void
}

const TodoContext = createContext<TodoContextType>({
    todos: [],
    addTodo: () => {},
    removeTodo: () => {},
    toggleTodo: () => {}
})
export const useTodoContext = () => useContext(TodoContext);
const TodoProvider = ({ children } : {children : React.ReactNode}) => {
    const [todos, setTodos] = useState<ToDo[]>([]);
    const { user } = useAuth()
    useEffect(() => {
        user && useGet(`/todo/`, {'token': `${user?.token}`}).then((res) => setTodos(res));
    }, [user])
    
    const addTodo = async (todo: string) => {
        const todoDetails : ToDo = await usePost("/todo", {'token': `${user?.token}`}, {task : todo});
        setTodos([...todos, todoDetails])
        
    }
    const removeTodo = (todo: ToDo) => {
        setTodos(todos.filter(t => t._id !== todo._id))
        usePost(`/todo/delete/${todo._id}`, {'token': `${user?.token}`}, {});
    }
    const toggleTodo = (todo: ToDo) => {
        setTodos(todos.map(t => t._id === todo._id ? {...todo, completed : !todo.completed} : t))
        usePost(`/todo/update`, {'token': `${user?.token}`}, {todoId : todo._id, completed : !todo.completed});
    }

    const val = {
        todos,
        addTodo,
        removeTodo,
        toggleTodo
    }

    return (
        <TodoContext.Provider value={val}>
            {children}
        </TodoContext.Provider>
    )
}

export default TodoProvider