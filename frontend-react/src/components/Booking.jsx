import styles from '../css/Booking.module.css';
import reserveTable from '../assests/reserve_table.jpg'


function handleSubmit(e){
    e.preventDefault();
}

export default function Booking(){

    const today = new Date().toISOString().split('T')[0]; 

    return <div className={styles.book}>
    <div>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder='Your Name'></input>
            <input type="number" placeholder='Phone Number' required></input>
            <input type="email" placeholder='Your Email' required></input>
            <select defaultValue='How many persons' required>
                <option value="How Many Persons?" disabled>
                    How many persons?
                </option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
            <input type="date" min={today} required></input>
            <button>BOOK NOW</button>
        </form>
    </div>
    <div>
        <img src={reserveTable}/>
    </div>
</div>
}