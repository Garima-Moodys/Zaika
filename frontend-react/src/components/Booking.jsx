import styles from '../css/Booking.module.css';
import reserveTable from '../assests/reserve_table.jpg'
import { useState,useContext} from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';


export default function Booking(){

    const today = new Date().toISOString().split('T')[0]; 
    const [name,setName]=useState('');
    const [number,setNumber]=useState('');
    const [email,setEmail]=useState('');
    const [persons,setPersons]=useState(2);
    const [date,setDate]=useState(today);
    const {token}=useContext(UserContext);


    async function handleSubmit(e){
        e.preventDefault();
        const formattedDate = new Date(date).toISOString().split('T')[0];
        await axios.post('http://127.0.0.1:8000/booking/addBooking',
            {phone_number:number,email:email,members:persons,date:formattedDate},
            {
                headers:{
                    Authorization:`Bearer ${token}`,
                },
            })
            .then((response)=>alert("Successfull booking"))
            .catch((error)=>{
                console.log(error.status)
                if(error.status===401){
                    console.log(error)
                }else if(error.status===400){
                    alert(error.response.data.detail);
                }
            })
        
        setName('');
        setNumber('');
        setEmail('');
        setPersons(2);
        setDate(today);
    }

    return <div className={styles.book}>
    <div>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder='Your Name' value={name} onChange={(e)=>setName(e.target.value)}></input>
            <input type="tel" placeholder='Phone Number' value={number} onChange={(e)=>setNumber(e.target.value)} pattern="^\+?[1-9]\d{1,14}$" required></input>
            <input type="email" placeholder='Your Email' value={email} onChange={(e)=>setEmail(e.target.value)} required></input>
            <select value={persons} onChange={(e)=>setPersons(e.target.value)} required>
                <option value="How Many Persons?" disabled>
                    How many persons?
                </option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
            <input value={date} type="date" min={today} onChange={(e)=>setDate(e.target.value)} required></input>
            <button>BOOK NOW</button>
        </form>
    </div>
    <div>
        <img src={reserveTable} alt="reserve table"/>
    </div>
</div>
}