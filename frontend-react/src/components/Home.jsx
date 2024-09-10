import React from 'react';
import Slider from 'react-slick';
import bgImg1 from '../assests/breakfast.jpg';
import bgImg2 from '../assests/dinner.avif';
import bgImg3 from '../assests/lunch.jpg';
import styles from '../css/Home.module.css';

export default function Home(){
    const settings = {
        infinite: true,
        speed: 700,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay:true,
        fade:true,
        autoplaySpeed: 2500,
        pauseOnHover: false,
      };

    return <>
        <div className={styles.slider_container}>
        <Slider {...settings}>
            <div className={styles.slick_slide}><img src={bgImg1} alt="Slide 1" /></div>
            <div className={styles.slick_slide}><img src={bgImg2} alt="Slide 2" /></div>
            <div className={styles.slick_slide}><img src={bgImg3} alt="Slide 3" /></div>
        </Slider>
        </div>
    </>
}