import React from 'react';
import Slider from 'react-slick';
import bgImg1 from '../assests/breakfast.jpg';
import bgImg2 from '../assests/dinner.avif';
import bgImg3 from '../assests/lunch.jpg';
import styles from '../css/Home.module.css';
import restaurant from '../assests/restaurant_discover.jpg';
import {Link} from 'react-router-dom';
import MealCard  from './MealCard';

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

function handleForm(e){
    e.preventDefault();
}


function SectionContact(){
    return <div className={styles.contact}>
        <div>
            <h1><span style={{fontFamily:'sans-serif',color:'yellow',fontSize:'60px'}}>CONTACT </span><br/> LET'S CHAT</h1>
            <p>Got questions or just want to connect?<br/> Drop us a message and we’ll be in touch soon!</p>
        </div>
        <div>
            <form onSubmit={handleForm}>
                <input type="text" placeholder='Your Name'></input>
                <input type="email" placeholder='Your Email'></input>
                <textarea rows="5" placeholder='Your Message'></textarea>
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
        <SectionContact/>
        
    </>
}