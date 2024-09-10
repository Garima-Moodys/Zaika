import { useEffect } from "react";
import axios from "axios";

export default function Menu(){

    useEffect(()=>{
        axios.get('https://www.themealdb.com/api/json/v1/1/categories.php')
        .then(response => {
            // console.log(response.data);
        })
        .catch(error => {
            console.log(error);
        });

        axios.get('https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood')
        .then(response => {
            // console.log(response.data);
        })
        .catch(error => {
            console.log(error);
        });
},[])

return (<></>)
    
}