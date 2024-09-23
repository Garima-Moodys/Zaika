import {useState,useContext} from 'react';
import { NavLink} from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import styles from "../css/Login_register.module.css";
import axios from 'axios';


export default function Login(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const { login,token,logout,getUser} = useContext(UserContext);

    const handleForm=async(e)=>{
        e.preventDefault();
        try{
            await login(email, password);
        }catch (error) {
            console.error('Error logging in:', error);
        }finally{
            setEmail('');
            setPassword('');
        }
        
    }

    const delAccount=async ()=>{
        try{
            await axios.delete('http://127.0.0.1:8000/users/delete',{
                headers:{
                    Authorization:`Bearer ${token}`
                },
            });
            logout();
        }catch(error){
            console.log("Unable to delete user",error);
        }

    }

    return <div className={styles.form}>
        <h1>LOGIN</h1>
        {token==null ?
        (<form onSubmit={handleForm}>
            <input type="email" placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)}></input>
            <input type="password" placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)}></input>
            <p><button type="submit">SUBMIT</button></p>
            <p style={{marginTop:"10px"}}>You don't have an account?<NavLink to='/register' >Register</NavLink></p>
        </form>):
        (<div className={styles.success}>
            <p>Successfull Login!</p>
            <h1>USER DETAILS</h1>
            <p>Name : {getUser.first_name} { getUser.last_name==null? '':getUser.last_name}</p>
            <p>Email : {getUser.email}</p>
            <p>
                <button onClick={logout}>Logout</button>
                <button onClick={delAccount}>Delete Account</button>
            </p>
        </div>)}
    </div>
}