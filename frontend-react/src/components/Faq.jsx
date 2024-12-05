import { useState } from 'react'
import { Icon } from '@passfort/castle'
import styles from '../css/Faq.module.css'


function Question({question,answer}){

    const [open,setOpen]=useState(false);

    return <div style={{borderTop:"2px solid black",borderBottom:'2px solid black',padding:'10px 5px'}}>
        <div>
            <div style={{fontWeight:'bolder',fontFamily:'Arial', letterSpacing:'1.5px',fontSize:'18px',display:'flex',justifyContent:'space-between'}}>
                <div>{question}</div>
                <div>
                    {!open && <Icon icon="add" onClick={()=>{setOpen(true)}} cursor='pointer' />}
                    {open && <Icon icon="close" onClick={()=>{setOpen(false)}} cursor='pointer'/>}
                </div>
            </div>
        </div>
        {open && <div style={{color:'black',textShadow:'1.5px 1.5px 1px lightyellow'}}>{answer}</div>}
    </div>
}

export default function Faq(){

    const qas=[{question:'What is Zaika?',answer:'Zaika is a restaurant located in Rajouri Garden, offering a culinary journey to exotic flavours and unforgettable moments. Our website lets you explore our menu, place online orders, make table reservations, and leave reviews about your dining experience with us.'},
            {question:'How can I place an order online from Zaika?',answer:'To place an order online, simply log in to your account, visit our Menu page, browse through our wide selection of dishes, and add your desired items to the cart. Once you are ready to check out, you can choose your preferred payment method: Stripe (for secure card payments) or Cash on Delivery.'},
            {question:'How do I make a reservation at Zaika?',answer:'To book a table, you need to be logged into your account. Once logged in, navigate to the Table Reservation page, select your preferred date and time, and provide the number of guests. Submit your reservation, and we’ll confirm your booking.'},
            {question:'What payment methods are available for online orders?',answer:'For online orders, we offer two payment options: 1.Stripe: Pay securely via credit or debit card. 2.Cash on Delivery: You can pay with cash when your order is delivered to your doorstep.'},
            {question:'Can I change or cancel my order after placing it?',answer:'Once an order is confirmed, we start preparing it immediately. If you need to change or cancel your order, please contact us as soon as possible through our Contact Form or call us directly. We’ll do our best to accommodate your request if the order has not been processed yet.'},
            {question:'How can I leave a review for Zaika?',answer:'To leave a review, you must be logged in to your account. After dining or ordering from Zaika, visit the Reviews page on our website to submit your feedback. Your review helps us improve and lets others know what to expect from their Zaika experience.'},
            {question:'How do I contact Zaika for general queries or support?',answer:'If you have any questions or need assistance, you can use our Contact Form on the homepage. Simply fill out the form with your query, and we will get back to you asap.'},
            {question:'Can I reserve a table for a special occasion or a large group?',answer:'Yes, Zaika welcomes reservations for special occasions, large groups, and events. Please use the Table Reservation page to book your table. If you have any specific requirements, feel free to reach out to us directly via the Contact Form, and we will do our best to accommodate your needs.'},
            {question:'What happens if I have a problem with my order or experience?',answer:' If you have any issues with your order or dining experience, please reach out to us immediately through the Contact Form or call us directly. We take feedback seriously and will do everything we can to resolve the matter to your satisfaction.'}]
    return <div className={styles.faq}>
        <div className={styles.faq_heading}>
            <h1 >FAQs</h1>
            <p>Frequently Asked Questions.</p>
            <p>Here are some common questions about Zaika.</p>
        </div>
        <div className={styles.qa}>
            {qas.map(qa=><Question question={qa.question} answer={qa.answer}/>)}
        </div>
    </div>
}

// 1. What is Zaika?
// Answer:
// Zaika is a restaurant located in Rajouri Garden, offering a culinary journey to exotic flavours and unforgettable moments. Our website lets you explore our menu, place online orders, make table reservations, and leave reviews about your dining experience with us.

// 2. How can I place an order online from Zaika?
// Answer:
// To place an order online, simply log in to your account, visit our Menu page, browse through our wide selection of dishes, and add your desired items to the cart. Once you are ready to check out, you can choose your preferred payment method: Stripe (for secure card payments) or Cash on Delivery.

// 3. How do I make a reservation at Zaika?
// Answer:
// To book a table, you need to be logged into your account. Once logged in, navigate to the Table Reservation page, select your preferred date and time, and provide the number of guests. Submit your reservation, and we’ll confirm your booking.

// 4. Do I need to create an account to order food or make a reservation?
// Answer:
// Yes, you need to log in to access our Menu, Table Reservation, and Reviews sections. Creating an account is quick and easy, and it ensures we can provide you with a personalized experience and keep track of your orders and bookings.

// 5. What payment methods are available for online orders?
// Answer:
// For online orders, we offer two payment options:

// Stripe: Pay securely via credit or debit card.
// Cash on Delivery: You can pay with cash when your order is delivered to your doorstep.
// 6. Can I change or cancel my order after placing it?
// Answer:
// Once an order is confirmed, we start preparing it immediately. If you need to change or cancel your order, please contact us as soon as possible through our Contact Form or call us directly. We’ll do our best to accommodate your request if the order hasn't been processed yet.

// 7. How can I leave a review for Zaika?
// Answer:
// To leave a review, you must be logged in to your account. After dining or ordering from Zaika, visit the Reviews page on our website to submit your feedback. Your review helps us improve and lets others know what to expect from their Zaika experience.

// 8. Can I view the menu without logging in?
// Answer:
// No, the Menu page is accessible only to logged-in users. This helps us provide a better and more personalized experience by allowing us to track your preferences and orders.

// 9. How do I contact Zaika for general queries or support?
// Answer:
// If you have any questions or need assistance, you can use our Contact Form on the homepage. Simply fill out the form with your query, and we'll get back to you as soon as possible.

// 10. How do I update my account details or password?
// Answer:
// To update your account details, log in and go to your Account Settings. From there, you can change your personal information or update your password if necessary.

// 11. Is my payment information safe on the website?
// Answer:
// Yes, we take your security seriously. We use SSL encryption to protect all sensitive information on our website. Payments made through Stripe are securely processed, and we ensure your data remains safe and private.

// 12. Do you offer delivery or takeaway options?
// Answer:
// Yes, Zaika offers both delivery and takeaway options. During checkout, you can choose your preferred method. If you select delivery, we'll bring your order directly to your location. If you prefer to pick up your order, simply choose takeaway when placing your order.

// 13. Can I reserve a table for a special occasion or a large group?
// Answer:
// Yes, Zaika welcomes reservations for special occasions, large groups, and events. Please use the Table Reservation page to book your table. If you have any specific requirements, feel free to reach out to us directly via the Contact Form, and we'll do our best to accommodate your needs.

// 14. What if I'm late for my reservation?
// Answer:
// If you're running late for your reservation, please contact us as soon as possible through the Contact Form or call us directly. We will do our best to hold your table for a reasonable time, but please be aware that we may not be able to guarantee availability if there are other guests waiting.

// 15. Can I customize my order?
// Answer:
// Yes! You can customize your order where possible. If there are specific preferences or dietary restrictions, you can mention them in the special instructions section during checkout. We'll do our best to accommodate your requests.

// 16. Is Zaika available for catering or events?
// Answer:
// Yes, we do offer catering services for special events, parties, and gatherings. For more information or to inquire about catering options, please reach out to us via the Contact Form or call us directly to discuss your needs.

// 17. Can I get updates about my order?
// Answer:
// Yes, you will receive updates about your order via email or SMS (if provided) once it is confirmed, dispatched, and delivered. For any urgent inquiries, you can also contact us directly via our Contact Form.

// 18. What happens if I have a problem with my order or experience?
// Answer:
// // If you have any issues with your order or dining experience, please reach out to us immediately through the Contact Form or call us directly. We take feedback seriously and will do everything we can to resolve the matter to your satisfaction.