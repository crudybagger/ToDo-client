import { ToDo } from './Components/ToDo'
import { Login } from './Components/Login'
import { Signup } from './Components/Signup'
import { useAuth } from './Context/AuthContext'
import { Routes, Route, Link, useNavigate, redirect, Navigate } from 'react-router-dom'
import './App.css'

function App() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  return (
    <>
      <h2 onClick={() => user && navigate("/todo")}>ToDo List</h2>
      <Routes>
        <Route path="/" Component={() => <Navigate to={`${user ? "/todo" : "/login" }`}/>} />
        <Route path='/login' Component={Login} />
        <Route path="/signup" Component={Signup} />"
        <Route path="/todo" Component={ToDo} />
      </Routes>
    <div className='footer'>
    {user ? <>Signed in as<strong> {user.username}</strong></> : ""}
    <p>{user ? (<>Not {user.username}? <Link to="/login" onClick={logout}>Logout and Login with another account</Link></>) : ""}</p>
    </div>
    </>
  )
}

export default App
