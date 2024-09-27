import {useContext, useState} from 'react';
import {useStripe,useElements,CardElement} from '@stripe/react-stripe-js';
import { UserContext } from '../context/UserContext';
import { CartContext } from '../context/CartContext';
import axios from 'axios';
import styles from '../css/PaymentForm.module.css';

const PaymentForm=({totalAmount,onClose,setIsCheckingOut})=>{
    const stripe=useStripe();
    const elements=useElements();
    const [error,setError]=useState(null);
    const {token}=useContext(UserContext);
    const {items,setItems}=useContext(CartContext);
    const [loading,setLoading]=useState(false);
    const [paymentMethod,setPaymentMethod]=useState('stripe');
    const [billingAddress, setBillingAddress] = useState({
        address: '',
        city: '',
        zip: '',
        country: '',
    });

    const handlePaymentMethodChange=(e)=>{
        setError(null)
        setPaymentMethod(e.target.value);
    };

    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setBillingAddress((prev) => ({ ...prev, [name]: value }));
    };

    async function handleSubmit(e){
        e.preventDefault();
        setLoading(true);
        setError(null);
        const today = new Date().toISOString().split('T')[0];

        if(paymentMethod==='stripe'){
            //Retrieves card information.
            const cardElement=elements.getElement(CardElement);
            try{
                //Sends a request to create a payment intent.
                const response=await axios.post('http://127.0.0.1:8000/create-payment-intent',{ amount: totalAmount });
                const {clientSecret}=response.data;
                //Confirms the payment using the client secret.
                const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                    payment_method: {
                    card: cardElement,
                    },
                });
        
                if (stripeError) {
                    setError(stripeError.message);
                } else if (paymentIntent.status === 'succeeded') {
                    alert('Payment successful!');
                    //add order to database
                    await axios.post('http://127.0.0.1:8000/orders/addOrder',{items:items,date:today,amount:totalAmount},{
                        headers:{
                            Authorization:`Bearer ${token}`
                        }
                    })
                    //Clears the cart upon successful payment
                    await axios.delete('http://127.0.0.1:8000/cart/deleteCartitems',{
                        headers:{
                            Authorization:`Bearer ${token}`,
                        }
                    })
                    setItems([]);
                    onClose();
                    setIsCheckingOut(false);
                }

            }catch(err){
                setError('Payment failed. Please try again.');
            }finally{
                setLoading(false);
            }
        }else if(paymentMethod==='cash'){
            
            alert('Cash payment selected. Please prepare the cash for delivery.');
            //add order to database
            await axios.post('http://127.0.0.1:8000/orders/addOrder',{items:items,date:today,amount:totalAmount},{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            //clear cart
            await axios.delete('http://127.0.0.1:8000/cart/deleteCartitems', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setItems([]);
            setLoading(false);
            onClose();
            setIsCheckingOut(false);
        }
        
    }


    return (<form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.address}>
            <h2>Billing Address</h2>
            <input
                type="text"
                name="address"
                placeholder="Address"
                value={billingAddress.address}
                onChange={handleAddressChange}
                required
            />
            <input
                type="text"
                name="city"
                placeholder="City"
                value={billingAddress.city}
                onChange={handleAddressChange}
                required
            />
            <input
                type="text"
                name="zip"
                placeholder="ZIP Code"
                value={billingAddress.zip}
                onChange={handleAddressChange}
                required
            />
            <input
                type="text"
                name="country"
                placeholder="Country"
                value={billingAddress.country}
                onChange={handleAddressChange}
                required
            />
        </div>
        <div className={styles.mode}>
            <h2>Payment Method</h2>
            <p><label>
                <input 
                    type="radio"
                    value="stripe"
                    checked={paymentMethod==='stripe'}
                    onChange={handlePaymentMethodChange}
                />
                Pay with Card
            </label></p>
            <p><label>
                <input 
                    type="radio"
                    value="cash"
                    checked={paymentMethod==='cash'}
                    onChange={handlePaymentMethodChange}
                />
                Cash On Delivery
            </label></p>
            {paymentMethod==='stripe' && <CardElement/>}
            {error && <div>{error}</div>}
            <div className={styles.button}>
                <button type="submit" disabled={!stripe || loading}>
                    {loading?"Processing" : "Place Order"}
                </button>
            </div>
        </div>
    </form>);
};

export default PaymentForm;