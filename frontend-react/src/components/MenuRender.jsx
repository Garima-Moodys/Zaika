import { useContext, useEffect, useState } from "react";
import { Spinner } from "@passfort/castle";
import ShoppingCartSharpIcon from "@mui/icons-material/ShoppingCartSharp";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import styles from "../css/Menu.module.css";
import { CartContext } from "../context/CartContext";
import Search from "./Search";


function CategoryCard(props) {
  return (
    <li
      className={styles.category}
      onClick={() => {
        props.handleClick(props.strTitle);
      }}
    >
      <img
        src={props.strThumb}
        style={{
          width: "100%",
          height: "150px",
          borderRadius: "20px 20px 0px 0px",
        }}
        alt="loading category"
      />
      <h1
        style={{
          padding: "20px",
          textAlign: "center",
          backgroundColor: "yellow",
        }}
      >
        {props.strTitle}
      </h1>
    </li>
  );
}

function FoodCard(props) {
  const [title, showTitle] = useState(false);
  const {addItem}=useContext(CartContext);
  return (
    <li
      className={styles.foodItems}
      onMouseOver={() => {
        showTitle(true);
      }}
      onMouseOut={() => {
        showTitle(false);
      }}
    >
      <img
        src={props.strThumb}
        style={{
          width: "100%",
          height: "150px",
          borderRadius: "20px 20px 0px 40px",
        }}
        alt="loading category"
      />
      {title && <h1 className={styles.menuTitle}>{props.strTitle}</h1>}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          color: "white",
          padding: "15px",
          alignItems: "center",
        }}
      >
        <p>&#8377; {props.price}</p>
        <button
          style={{
            height: "40px",
            width: "40px",
            backgroundColor: "yellow",
            color: "black",
            borderRadius: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={(e)=>{addItem(props.strTitle)}}
        >
          <ShoppingCartSharpIcon sx={{ fontSize: 20 }}  />
        </button>
      </div>
    </li>
  );
}

export default function MenuRender({
  categories,
  foodItems,
  currentContent,
  loading,
  handleCategoryClick,
  setContent,
}) {

  const [filteredContent,setFilteredContent]=useState([]);

  useEffect(()=>{
    if(currentContent==='categories'){
      setFilteredContent(categories);
    }else{
      setFilteredContent(foodItems);
    }
  },[currentContent,categories,foodItems])

  if (loading) {
    return (
      <div className={styles.spinner}>
        <p>Loading your menu...</p>
        <Spinner size="xl" />
      </div>
    );
  } else if (currentContent === "categories") {
    return (
      <>
      <Search cc={currentContent} content={categories} setFilteredContent={setFilteredContent}/>
      <ul className={styles.categories}>
        {filteredContent.map((category) => {
          return (
            <CategoryCard
              key={category.idCategory}
              strThumb={category.strCategoryThumb}
              strTitle={category.strCategory}
              handleClick={handleCategoryClick}
            />
          );
        })}
      </ul>
      </>
    );
  } else {
    return (
      <>
        <div style={{display:'flex',alignItems:'center',justifyContent:'center',margin:'0 5%'}}>
          <IconButton
            onClick={() => {
              setContent("categories");
            }}
          >
            <ArrowBackIcon sx={{ fontSize: 50 }} />
          </IconButton>
          <div style={{flex:'1'}}>
            <Search cc={currentContent} content={foodItems} setFilteredContent={setFilteredContent}/>
          </div>
        </div>
        <ul className={styles.categories}>
          {filteredContent.map((meal) => {
            return (
              <FoodCard
                key={meal.idMeal}
                strThumb={meal.strMealThumb}
                strTitle={meal.strMeal}
                price="20"
              />
            );
          })}
        </ul>
      </>
    );
  }
}
