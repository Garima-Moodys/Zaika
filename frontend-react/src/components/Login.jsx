import {useState,useContext} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import styles from "../css/Login_register.module.css";


export default function Login(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate=useNavigate();
    const { login,token,logout} = useContext(UserContext);

    const handleForm=async(e)=>{
        e.preventDefault();
        try{
            await login(email, password);
            navigate('/');
        }catch (error) {
            console.error('Error logging in:', error);
            alert('Login failed. Please check your credentials and try again.');
        }finally{
            setEmail('');
            setPassword('');
        }
        
    }

    return <div className={styles.form}>
        <h1>LOGIN</h1>
        {token==null ?(<form onSubmit={handleForm}>
            <input type="email" placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)}></input>
            <input type="password" placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)}></input>
            <p><button type="submit">SUBMIT</button></p>
            <p style={{marginTop:"10px"}}>You don't have an account?<NavLink to='/register' >Register</NavLink></p>
        </form>):(<><p>Successfull Login!</p><p><button onClick={logout}>Logout</button></p></>)}
    </div>
}