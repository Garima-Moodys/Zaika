import { useContext, useState } from "react";
import { Spinner } from "@passfort/castle";
import ShoppingCartSharpIcon from "@mui/icons-material/ShoppingCartSharp";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import styles from "../css/Menu.module.css";
import { CartContext } from "../context/CartContext";


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
        <p>$ {props.price}</p>
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
  if (loading) {
    return (
      <div className={styles.spinner}>
        <p>Loading your menu...</p>
        <Spinner size="xl" />
      </div>
    );
  } else if (currentContent === "categories") {
    return (
      <ul className={styles.categories}>
        {categories.map((category) => {
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
    );
  } else {
    return (
      <>
        <p style={{ position: "relative", left: "7%", top: "30px" }}>
          <IconButton
            onClick={() => {
              setContent("categories");
            }}
          >
            <ArrowBackIcon sx={{ fontSize: 50 }} />
          </IconButton>
        </p>
        <ul className={styles.categories}>
          {foodItems.map((meal) => {
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
