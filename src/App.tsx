import { ToDo } from './Components/ToDo'
import { Login } from './Components/Login'
import { Signup } from './Components/Signup'
import { useAuth } from './Context/AuthContext'
import { Routes, Route } from 'react-router-dom'
import './App.css'

function App() {
  const { user } = useAuth()
  return (
    <>
    <h1>Welcome {user ? user.username : ""}</h1>
      <Routes>
        <Route path='/login' Component={Login} />
        <Route path="/signup" Component={Signup} />"
        <Route path="/todo" Component={ToDo} />
      </Routes>
    </>
  )
}

export default App
