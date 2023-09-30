import { useAuth } from '../Context/AuthContext'
import {useRef} from 'react' 
export const Signup = () => {
  const { signUp } = useAuth();
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const usernameRef = useRef<HTMLInputElement>(null)
  return (
    <div>
      <h1>Signup</h1>
      <form action="" onSubmit={async (e) => {
        e.preventDefault()
        await signUp({
          email: emailRef.current?.value || '',
          password: passwordRef.current?.value || '',
          username: usernameRef.current?.value || '',
        })
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
        <label htmlFor="username">Username : </label>
        <input type="text" placeholder='Enter your username' id='username' ref={usernameRef}/>
        <br/>
        <button type="submit">Signup</button>
      </form>
      
    </div>
  )
}
