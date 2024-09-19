import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [getUser, setUser] = useState({});
    const navigate=useNavigate();

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
            fetchUser(); 
        } else {
            localStorage.removeItem('token');
            setUser({});
        }
    }, [token]);

    const fetchUser=async ()=>{
        try{
            const current_user= await axios.get('http://127.0.0.1:8000/users/', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
            })
            console.log(current_user.data);
            setUser(current_user.data);
        }catch(error){
            console.error('Error in fetching user details', error);
        }
    }

    const login = async (email, password) => {
        
        try {
            const formData = new URLSearchParams();
            formData.append('username', email);
            formData.append('password', password);
            const response = await axios.post('http://127.0.0.1:8000/auth/token', formData);
            navigate('/');
            setToken(response.data.access_token);
        } catch (error) {
            console.error('Login failed:', error);
            alert('Login failed. Please check your credentials and try again.');
        }
    };

    const logout = () => {
        setToken(null);
    };

    return (
        <UserContext.Provider value={{ token, login, logout,getUser }}>
            {children}
        </UserContext.Provider>
    );
};
