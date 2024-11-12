import React, {useEffect, useState } from 'react';
import Slider from 'react-slick';
import bgImg1 from '../assests/breakfast.jpg';
import bgImg2 from '../assests/dinner.avif';
import bgImg3 from '../assests/lunch.jpg';
import styles from '../css/Home.module.css';
import restaurant from '../assests/restaurant_discover.jpg';
import {Link} from 'react-router-dom';
import axios from 'axios';

function Headline(){
    return <div className={styles.headline}>
        <h1>ZAIKA:<br/>Culinary Journey to Exotic Flavors <br/>AND <br/>Unforgettable Moments</h1>
        <Link to='/menu'>ORDER ONLINE</Link>
        <Link to='/booking'>BOOK TABLE</Link>
    </div>
}

function SectionDiscover(){
    return <div className={styles.discover}>
        <div>
            <h1><span style={{fontFamily:'sans-serif',color:'yellow'}}>DISCOVER </span><br/> OUR STORY</h1>
            <p>Zaika is more than just a restaurant—it's a culinary adventure. Our chefs are passionate explorers of global flavors, constantly experimenting and innovating to bring you unique dining experiences. Whether it’s a classic dish with a modern twist or an exotic fusion creation, Zaika’s menu is designed to take your taste buds on an unforgettable journey.</p>
        </div>
        <div><img src={restaurant}/></div>
    </div>
}

function MostOrderedDish(){
    const [orders,setOrders]=useState([]);

    useEffect(()=>{
        axios.get('http://127.0.0.1:8000/orders/allOrders').then((response)=>{
            setOrders(response.data);
        }).catch(error=>console.log(error))
    },[])

    // Get the current date
    const currentDate = new Date();

    // Get the date 30 days ago
    const pastDate = new Date();
    pastDate.setDate(currentDate.getDate() - 30);

    // Format the dates as YYYY-MM-DD (ISO 8601 format)
    const startDate = pastDate.toISOString().split('T')[0];
    const endDate = currentDate.toISOString().split('T')[0]; 

    const filteredOrders=orders.filter(order=>order.order_date>=startDate && order.order_date<=endDate);
    const famous_item=[{item_name:'',count:0},];
    const count_items={};
    for(let i=0;i<filteredOrders.length;i++){
        for(let j=0;j<filteredOrders[i].items.length;j++){
            if(filteredOrders[i].items[j].item_name in count_items){
                count_items[filteredOrders[i].items[j].item_name]++;
            }else{
                count_items[filteredOrders[i].items[j].item_name]=1;
            }

            if(famous_item.count===0 || count_items[filteredOrders[i].items[j].item_name]>famous_item[0].count){
                famous_item[0].item_name=filteredOrders[i].items[j].item_name;
                famous_item[0].count=count_items[filteredOrders[i].items[j].item_name];
                famous_item.splice(1);
            }else if(count_items[filteredOrders[i].items[j].item_name]===famous_item[0].count){
                const new_famous={item_name:filteredOrders[i].items[j].item_name,count:count_items[filteredOrders[i].items[j].item_name]};
                famous_item.push(new_famous);
            }
        }
    }
    return <div className={styles.famousDish}>
            <h1><span style={{fontFamily:'sans-serif',color:'yellow',fontSize:'50px'}}>MOST ORDERED DISH</span><br/>LAST 30 DAYS </h1>
            <div className={styles.dish}>
                {famous_item.map(item=><div>{item.item_name}</div>)}
            </div>
        </div>
}

function MealCard(props){
    return (
        <div style={{backgroundColor: 'rgba(255, 255, 255, 0.8)',borderRadius:'10px'}}>
            <img src={props.img} style={{borderRadius:'inherit'}}/>
            <h1 style={{padding:'20px',textAlign:'center',backgroundColor:'yellow'}}>{props.title}</h1>
            <p style={{padding:'10px',textAlign:'center'}}>{props.desc}</p>
        </div>
    );
}

function SectionMenu(){
    return <div className={styles.meal}>
        <h1 className={styles.Subheading}><span style={{fontFamily:'sans-serif',color:'yellow'}}>DISCOVER </span><br/><br/> OUR MENU</h1>
        <ul>
            <li><MealCard img='https://www.themealdb.com/images/category/breakfast.png' title="Breakfast" desc="Breakfast is the first meal of a day. The word in English refers to breaking the fasting period of the previous night. There is a strong likelihood for one or more 'typical, or 'traditional', breakfast menus to exist in most places, but their composition varies widely from place to place, and has varied over time."/></li>
            <li><MealCard img='https://www.themealdb.com/images/category/starter.png' title="Starter" desc="An entrée in modern French table service and that of much of the English-speaking world (apart from the United States and parts of Canada) is a dish served before the main course of a meal; it may be the first dish served, or it may follow a soup or other small dish or dishes."/></li>
            <li><MealCard img='https://www.themealdb.com/images/category/side.png' title="Side" desc="A side dish, sometimes referred to as a side order, side item, or simply a side, is a food item that accompanies the entrée or main course at a meal. Side dishes such as salad, potatoes and bread are commonly used with main courses throughout many countries of the western world."/></li>
            <li><MealCard img='https://www.themealdb.com/images/category/dessert.png' title="Dessert" desc="Dessert is a course that concludes a meal. The course usually consists of sweet foods, such as confections dishes or fruit, and possibly a beverage such as dessert wine or liqueur, however in the United States it may include coffee, cheeses, nuts, or other savory items regarded as a separate course else."/></li>
        </ul>
        <Link to='/menu'>FOR MORE...</Link>
    </div>
}



function SectionContact(){
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [msg,setMsg]=useState('');
    function handleForm(e){
        e.preventDefault();
        axios.post('http://127.0.0.1:8000/contact/',{name:name,email:email,msg:msg})
        .then((response)=>{alert("Form submitted successfully! Will get in touch soon."); 
            setName('');
            setEmail('');
            setMsg('');})
        .catch(error=>console.log(error))
    }    
    return <div className={styles.contact}>
        <div>
            <h1><span style={{fontFamily:'sans-serif',color:'yellow',fontSize:'60px'}}>CONTACT </span><br/> LET'S CHAT</h1>
            <p>Got questions or just want to connect?<br/> Drop us a message and we’ll be in touch soon!</p>
        </div>
        <div>
            <form onSubmit={handleForm}>
                <input type="text" placeholder='Your Name' value={name} onChange={(e)=>{setName(e.target.value)}}></input>
                <input type="email" placeholder='Your Email' value={email} onChange={(e)=>{setEmail(e.target.value)}} required></input>
                <textarea rows="5" placeholder='Your Message' value={msg} onChange={(e)=>{setMsg(e.target.value)}}  required></textarea>
                <button>SEND MESSAGE</button>
            </form>
        </div>
    </div>
}

export default function Home(){
    const settings = {
        infinite: true,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay:true,
        fade:true,
        autoplaySpeed: 2500,
        pauseOnHover: false,
    };

    return <>
        <Headline/>
        <div className={styles.slider_container}>
            <Slider {...settings}>
                <div className={styles.slick_slide}><img src={bgImg1} alt="Slide 1" /></div>
                <div className={styles.slick_slide}><img src={bgImg2} alt="Slide 2" /></div>
                <div className={styles.slick_slide}><img src={bgImg3} alt="Slide 3" /></div>
            </Slider>
        </div>
        <SectionDiscover/>
        <SectionMenu/>
        <MostOrderedDish/>
        <SectionContact/>
    </>
}