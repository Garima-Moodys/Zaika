import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import styles from "../css/Header.module.css";
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <nav id="header">
      <div className={styles.logo}>
        <h1>ZAIKA</h1>
      </div>
      <div className={styles.features}>
        <NavLink to="/">HOME</NavLink>
        <NavLink to="/menu">MENU</NavLink>
        <NavLink to="/booking">BOOK TABLE</NavLink>
      </div>
      <div className={styles.icons}>
        <a href="#">
          <ShoppingCartIcon />
        </a>
        <a href="#">
          <AccountCircleIcon />
        </a>
      </div>
    </nav>
  );
}
