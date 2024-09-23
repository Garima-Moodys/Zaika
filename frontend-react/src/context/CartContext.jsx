import { createContext,useEffect,useState,useContext} from "react";
import { UserContext } from "../context/UserContext";
import axios from 'axios';

export const CartContext=createContext();

export function CartProvider({children}){

    const [items,setItems]=useState([]);
    const { token } = useContext(UserContext);

    useEffect(()=>{
        axios
      .get("http://127.0.0.1:8000/cart/allCartitems", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => setItems(response.data))
      .catch((error) => console.log(error));
    },[token])

    const addItem = async (new_item) => {
        const existingItemIndex=items.findIndex((item)=>new_item==item.item_name);
        if (existingItemIndex <= -1) {
            await axios.post(`http://127.0.0.1:8000/cart/addTocart/${new_item}`,{},
                {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  }
            ).then(response=>console.log(response)).catch(error=>console.log(error.response))
                
        } else {
            const old_quantity=items[existingItemIndex].quantity;
            const updatedQuantity=old_quantity+1;
            const item_id=items[existingItemIndex].item_id;
            await axios.put(`http://127.0.0.1:8000/cart/updateCart/${item_id}/${updatedQuantity}`,{},
                {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  }
            ).then(response=>console.log(response)).catch(error=>console.log(error.response))
        }
        axios.get("http://127.0.0.1:8000/cart/allCartitems", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((response) => setItems(response.data)).catch((error) => console.log(error));
    }

    const removeItem=async (remove_item)=>{
        const existingItemIndex=items.findIndex((item)=>remove_item==item.item_name);
        const old_quantity=items[existingItemIndex].quantity;
        const updatedQuantity=old_quantity-1;
        const item_id=items[existingItemIndex].item_id;
        if(updatedQuantity==0){
            await axios.delete(`http://127.0.0.1:8000/cart/deleteFromcart/${item_id}`,
                {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  }
            ).then(response=>console.log(response)).catch(error=>console.log(error.response))
        }else{
            await axios.put(`http://127.0.0.1:8000/cart/updateCart/${item_id}/${updatedQuantity}`,{},
                {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  }
            ).then(response=>console.log(response)).catch(error=>console.log(error.response))
        }
        axios.get("http://127.0.0.1:8000/cart/allCartitems", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((response) => setItems(response.data)).catch((error) => console.log(error));
    }

    return <CartContext.Provider value={{items,addItem,removeItem}}>
        {children}
    </CartContext.Provider>
}