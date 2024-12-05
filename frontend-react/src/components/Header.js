import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import styles from "../css/Header.module.css";
import { NavLink } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";
import { useDisclosure } from "@passfort/castle";
import CartModal from "./CartModal";

export default function Header() {
  const { items } = useContext(CartContext);
  const { token } = useContext(UserContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  function clickHandle() {
    if (token == null) {
      alert("User not logged in!");
      return;
    }
    onOpen();
  }

  return (
    <>
      <CartModal isOpen={isOpen} onClose={onClose} />
      <nav id="header">
        <div className={styles.logo}>
          <h1>ZAIKA</h1>
        </div>
        <div className={styles.features}>
          <NavLink to="/">HOME</NavLink>
          <NavLink to="/menu">MENU</NavLink>
          <NavLink to="/booking">BOOK TABLE</NavLink>
          <NavLink to="/reviews">REVIEWS</NavLink>
          <NavLink to="/faq">FAQ</NavLink>
        </div>
        <div className={styles.icons}>
          <button onClick={clickHandle}>
            <ShoppingCartIcon />
            <strong>
              <sub>({items.length})</sub>
            </strong>
          </button>
          <NavLink to="/login">
            <AccountCircleIcon />
          </NavLink>
        </div>
      </nav>
    </>
  );
}
