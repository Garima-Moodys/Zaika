import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import styles from "../css/Menu.module.css";
import MenuRender from "./MenuRender";

export default function Menu() {
  const [categories, setCategories] = useState([]);
  const [foodItems, setFooditems] = useState([]);
  const [currentContent, setContent] = useState();
  const [loading, setLoading] = useState(true);

  const handleCategoryClick = useCallback((category) => {
    setLoading(true);
    axios
      .get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
      .then((response) => {
        setFooditems(response.data.meals);
        setLoading(false);
        setContent("fooditems");
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://www.themealdb.com/api/json/v1/1/categories.php")
      .then((response) => {
        setCategories(response.data.categories);
        setLoading(false);
        setContent("categories");
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className={styles.menupage}>
      <h1>OUR MENU</h1>
      <MenuRender
        categories={categories}
        foodItems={foodItems}
        currentContent={currentContent}
        loading={loading}
        handleCategoryClick={handleCategoryClick}
        setContent={setContent}
      />
    </div>
  );
}
