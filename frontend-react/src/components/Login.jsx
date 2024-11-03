import {useState,useContext, useEffect} from 'react';
import { NavLink} from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import styles from "../css/Login_register.module.css";
import axios from 'axios';


export default function Login(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [bookings,setBookings]=useState([]);
    const [orders,setOrders]=useState([]);
    
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

    const delBooking=async(booking_id)=>{
        try{
            await axios.delete(`http://127.0.0.1:8000/booking/delete/${booking_id}`,{
                headers:{
                    Authorization:`Bearer ${token}`
                },
            });
            await axios.get('http://127.0.0.1:8000/booking/',
                {
                    headers:{
                        Authorization:`Bearer ${token}`,
                    },
                }).then(response=>setBookings(response.data))

        }catch(error){
            console.log("Unable to cancel booking :",error);
        }
    }

    useEffect(()=>{
        
        if(token==null){
            return;
        }  
        axios.get('http://127.0.0.1:8000/booking/',
            {
                headers:{
                    Authorization:`Bearer ${token}`,
                },
            })
            .then((response)=>setBookings(response.data))
            .catch((error)=>{
                console.log(error)
            })
        axios.get('http://127.0.0.1:8000/orders/',
            {
                headers:{
                    Authorization:`Bearer ${token}`,
                },
            })
            .then((response)=>setOrders(response.data))
            .catch((error)=>{
                console.log(error)
            }
        )
    },[token])

    return <div>
        
        {token==null ?
        (<div className={styles.form}>
            <h1>LOGIN</h1>
            <form onSubmit={handleForm}>
                <input type="email" placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)}></input>
                <input type="password" placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)}></input>
                <p><button type="submit">SUBMIT</button></p>
                <p style={{marginTop:"10px"}}>You don't have an account?<NavLink to='/register' >Register</NavLink></p>
            </form>
        </div>):
        (<div className={styles.success}>
            <h1>USER DETAILS</h1>
            <div className={styles.userDetails}>
                <p>Name : {getUser.first_name} { getUser.last_name==null? '':getUser.last_name}</p>
                <p>Email : {getUser.email}</p>
            </div>
            <hr style={{height:'1px',backgroundColor:'gray',marginTop:'5px'}}/>
            <h1>BOOKING DETAILS</h1>
            <ul>
                {bookings.length===0?<p>No table bookings done!</p>:bookings.map((booking)=>{
                    return <li className={styles.bookCard} key={booking.booking_id}>
                        <div>
                            <p>Email: {booking.email}</p>
                            <p>Contact: {booking.phone_number}</p>
                        </div>
                        <div>
                            <p>Number of members: {booking.number_of_members} </p>
                            <p>{booking.booking_date}</p>
                        </div>
                        <button onClick={()=>{delBooking(booking.booking_id)}}>Cancel booking</button>
                        </li>
                })}
            </ul>
            <hr style={{height:'1px',backgroundColor:'gray',marginTop:'5px'}}/>
            <h1>ORDER DETAILS</h1>
            <ul>
                {orders.length===0?<p>No Past Orders!</p>:orders.map((order)=>{
                    return <li className={styles.orderCard} key={order.order_id}>
                        <div>
                            <ol>
                            {order.items.map(item=>{
                                return <li>
                                    {item.item_name} &times;{item.quantity}
                                </li>
                            })}
                            </ol>
                        </div>
                        <div>
                            <p>Date: {order.order_date} </p>
                            <p>Amount: &#8377; {order.amount}</p>
                            {order.payment_mode && <p>Payment Mode: {order.payment_mode=='cash'?"cash":"online"}</p>}
                        </div>
                        </li>
                })}
            </ul>
            <hr style={{height:'1px',backgroundColor:'gray',marginTop:'5px'}}/>
            <p style={{margin:'20px'}}>
                <button onClick={logout}>Logout</button>
                <button onClick={delAccount}>Delete Account</button>
            </p>
        </div>)}
    </div>
}