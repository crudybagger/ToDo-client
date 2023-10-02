import { createContext, useContext, useState } from'react'
import { useNavigate } from 'react-router-dom'
import { usePost } from '../Hooks/useApi';

type User = {
    email : string,
    username : string,
    token : string,
}
type AuthContextType = {
    user : User | null,
    login : (email : string, password : string) => Promise<void>,
    logout : () => Promise<void>,
    signUp : (user : any) => Promise<void>,
}

const signInWithEmailAndPassword = async (email : string, password : string) => {
    const data = await usePost("/auth/login", {}, {email, password});
    return {
            email : data.email,
            username: data.username,
            token: data.token
        }
}
const AuthContext = createContext<AuthContextType>({
    user: null,
    login: () => Promise.resolve(),
    logout: () => Promise.resolve(),
    signUp: () => Promise.resolve(),
})
export const useAuth = () : AuthContextType => useContext(AuthContext);

function AuthProvider({ children } : { children : React.ReactNode }) {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') as string));;
    const navigate = useNavigate();

    const login = async (email : string, password : string) => {
        if (!email ||!password) return;
        try {
            const user = await signInWithEmailAndPassword(email, password);
            setUser(user);
            localStorage.setItem('user', JSON.stringify(user));
            navigate('/todo')
        } catch (error) {
            console.error(error);
        }
    }
    
    const logout = async () => {
        setUser(null);
        localStorage.removeItem('user');
    }

    const signUp = async ({email, username, password} : {email : string, username : string, password : string}) => {
        try {
            await usePost("/auth/signup", {}, {email, username, password});
            login(email, password);
        }
        catch (error) {
            console.log(error);
        }
    }
    const value = {
        user,
        login,
        logout,
        signUp,
    }
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider