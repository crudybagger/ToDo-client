import { Link } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext'
import {useRef} from 'react' 
export const Login = () => {
  const { login } = useAuth();
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  return (
    <div>
      <h1>Login</h1>
      <form action="" onSubmit={async (e) => {
        e.preventDefault()
        await login(emailRef.current?.value || "", passwordRef.current?.value || "")
        if(emailRef.current) emailRef.current.value = ''
        if(passwordRef.current) passwordRef.current.value = ''
      }}>
        {/* add label name of property before input */}
        <label htmlFor="email">Email : </label>
        <input type="email" placeholder='Enter your Email' id='email' ref={emailRef}/>
        <br/>
        <label htmlFor="password">Password : </label>
        <input type="password" placeholder='Enter your password' id='password' ref={passwordRef}/>
        <br/>
        <button type="submit">Login</button>
        
      </form>
      <p>Login as
      <a onClick={async () => await login('test@test.com', 'test')}> Guest 1 ,</a>
      <a onClick={async () => await login('abc@abc.com', 'abc')}> Guest 2</a>
      </p>
      <p>Don't have an account? <Link to="/signup">Create New Account</Link></p>
    </div>
  )
}
