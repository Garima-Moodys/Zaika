import styles from '../css/Reviews.module.css';
import { useContext, useState,useEffect } from 'react';
import { Icon, FormControl} from '@passfort/castle';
import { Modal,Button,useDisclosure} from '@passfort/castle';
import { UserContext } from '../context/UserContext';
import axios from 'axios';

function CustomerReview({userDetails,reviewDetails}){
    return <div className={styles.reviewBox}>
        <div>
            <p>{userDetails.firstName +" "+ userDetails.lastName}</p>
            <p>{userDetails.email}</p>
        </div>
        <div>
            <Icon icon={reviewDetails.stars>=1?"star":"star_border"} size="s" />
            <Icon icon={reviewDetails.stars>=2?"star":"star_border"} size="s" />
            <Icon icon={reviewDetails.stars>=3?"star":"star_border"} size="s" />
            <Icon icon={reviewDetails.stars>=4?"star":"star_border"} size="s" />
            <Icon icon={reviewDetails.stars>=5?"star":"star_border"} size="s" />
            <p>{reviewDetails.description}</p>
        </div>
    </div>
}

export default function Reviews(){
    const {token}=useContext(UserContext);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [rating,setRating]=useState(0);
    const [desc,setDesc]=useState('');
    const [allReviews,setReviews]=useState([]);
    const [avgRating,setavgRating]=useState(0);
    const [userDetailsMap,setUserDetailsMap] = useState({});

    async function getUserDetails(user_id){
        try{
            const res= await axios.get(`http://127.0.0.1:8000/users/userDetails?user_id=${user_id}`);
            const data=res.data;
            return {firstName:data.first_name,lastName:data.last_name,email:data.email};
        }catch(err){
            console.log(err);
            return null;
        }
    }

    const fetchReviewsAndUsers =async ()=>{
        const res = await axios.get('http://127.0.0.1:8000/reviews/');
        const reviewsData = res.data;
        const userDetails={};
        
        // Create an array of promises to fetch user details
        const userDetailsPromises = reviewsData.map(async (review) => {
            const userDetail = await getUserDetails(review.user_id);
            return { userId: review.user_id, userDetail };
        });

        // Wait for all user detail promises to resolve
        const userDetailsArray=await Promise.all(userDetailsPromises);
        userDetailsArray.forEach(({userId,userDetail})=>{
            userDetails[userId]=userDetail;
        })

        setUserDetailsMap(userDetails);
        setReviews(reviewsData);
        
    }

    useEffect(()=>{
        fetchReviewsAndUsers();
    },[])

    useEffect(()=>{
        let avg=0;
        allReviews.forEach(review=>{
            avg+=review.stars;
        })
        if (allReviews.length>0) avg=avg/(allReviews.length);
        setavgRating(avg);
    },[allReviews])


    async function handleSubmit(){
        if(rating===0){
            alert('Please give rating!');
            return;
        }else if(desc===''){
            alert('Review should not be empty!');
            return;
        }else{
            axios.post('http://127.0.0.1:8000/reviews/addReview',
            {rating:rating,desc:desc},
            {
                headers:{
                    Authorization:`Bearer ${token}`,
                },
            }).then(async(response)=>{ 
                    onClose();
                    alert("Thanks for your feedback!")
                    await fetchReviewsAndUsers();
            }).catch((error)=>{
                onClose();
                console.log(error)
            })
            setRating(0);
            setDesc('');
        }
        
    }

    return <div>
        <Modal
        width="500px"
        title="Feedback"
        isOpen={isOpen}
        onClose={()=>{
            setRating(0);
            setDesc('');
            onClose();
        }}>
            <FormControl >
                <div style={{textAlign:'center'}}>
                    <Icon icon={rating>=1?"star":"star_border"} cursor="pointer" size="lg" onClick={()=>setRating(1)}/>
                    <Icon icon={rating>=2?"star":"star_border"} cursor="pointer" size="lg" onClick={()=>setRating(2)}/>
                    <Icon icon={rating>=3?"star":"star_border"} cursor="pointer" size="lg" onClick={()=>setRating(3)}/>
                    <Icon icon={rating>=4?"star":"star_border"} cursor="pointer" size="lg" onClick={()=>setRating(4)}/>
                    <Icon icon={rating>=5?"star":"star_border"} cursor="pointer" size="lg" onClick={()=>setRating(5)}/>
                    <textarea rows="5" style={{marginTop:'8px',marginBottom:'8px',width:'100%',padding:'5px',border:'2px solid gray',borderRadius:'10px'}} placeholder='Write a review' value={desc} onChange={(e)=>setDesc(e.target.value)} isRequired/>
                    <Button type="primary" px='10' label="Submit" onClick={handleSubmit}/>
                </div>
            </FormControl>
      </Modal>
        <section className={styles.heading}>
            <h1>Real folks, real reviews</h1>
            <button onClick={()=>onOpen()}>Write a Review</button>
        </section>
        <section className={styles.reviewsSection}>
            <div>
                <Icon icon={avgRating>0?(avgRating<1?"star_half":"star"):"star_border"}  />
                <Icon icon={avgRating>=1?(avgRating<2?"star_half":"star"):"star_border"}  />
                <Icon icon={avgRating>=2?(avgRating<3?"star_half":"star"):"star_border"}  />
                <Icon icon={avgRating>=3?(avgRating<4?"star_half":"star"):"star_border"}  />
                <Icon icon={avgRating>=4?(avgRating<5?"star_half":"star"):"star_border"}  />
                <span style={{marginLeft:'10px'}}>{allReviews.length} reviews</span>
            </div>
            <div className={styles.reviews}>
                {allReviews.map((review)=>{
                    const ind=review.user_id;
                    return <CustomerReview userDetails={userDetailsMap[ind] || { firstName: '', lastName: '', email: '' }} reviewDetails={review}/>
                })}
            </div>
        </section>
    </div>

}


