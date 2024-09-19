import React, {useState } from 'react';
import axios from 'axios';
import { useNavigate,NavLink } from 'react-router-dom';
import styles from "../css/Login_register.module.css";


export default function Register(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRepassword] = useState('');
    const [firstName, setFirst] = useState('');
    const [lastName, setLast] = useState('');
    
    const navigate = useNavigate(); 

    const handleForm=async (e)=>{
        e.preventDefault();
        if(password!==repassword){
            alert('Passwords do not match');
            return;
        }
        try{
            await axios.post('http://127.0.0.1:8000/auth/',{
                first_name:firstName,
                last_name:lastName,
                email:email,
                password:password
            });
            alert('Sign up successful! You can now log in.');
            navigate('/login');
        }catch(error){
            console.error('Error signing up:', error);
            alert('Sign up failed. Please try again.')
            alert(error.response.data.detail);
        }finally{
            setEmail('');
            setPassword('');
            setRepassword('');
            setFirst('');
            setLast('');
        }

    }

    return <div className={styles.form}>
        <h1>SIGN IN</h1>
        <form onSubmit={handleForm}>
            <input type="text" placeholder='First Name' value={firstName} onChange={(e)=>setFirst(e.target.value)} required></input>
            <input type="text" placeholder='Last Name' value={lastName} onChange={(e)=>setLast(e.target.value)}></input>
            <input type="email" placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)} required></input>
            <input type="password" placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)} pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters" required></input>
            <input type="password" placeholder='Confirm Password' value={repassword} onChange={(e)=>setRepassword(e.target.value)} required></input>
            <p><button>SUBMIT</button></p>
            <p style={{marginTop:"10px"}}>Already have an account?<NavLink to='/login' >Login</NavLink></p>
        </form>
    </div>
}