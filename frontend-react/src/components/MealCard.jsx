

export default function MealCard(props){
    return (
        <div style={{backgroundColor: 'rgba(255, 255, 255, 0.8)',borderRadius:'10px'}}>
            <img src={props.img} style={{borderRadius:'inherit'}}/>
            <h1 style={{padding:'20px',textAlign:'center',backgroundColor:'yellow'}}>{props.title}</h1>
            <p style={{padding:'10px',textAlign:'center'}}>{props.desc}</p>
        </div>
    );
}