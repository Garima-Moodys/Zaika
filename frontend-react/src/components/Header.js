import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import styles from "../css/Header.module.css";
import { NavLink } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { UserContext } from "../context/UserContext";
import { useContext, useEffect, useState } from "react";
import { Modal, Button } from "@passfort/castle";
import { useDisclosure, Text } from "@passfort/castle";

function CartModal({ isOpen, onClose }) {
  const { items, addItem, removeItem } = useContext(CartContext);
  const [totalAmount, setAmount] = useState(0);

  useEffect(() => {
    let amount = 0;
    for (let i = 0; i < items.length; i++) {
      amount += items[i].price * items[i].quantity;
    }
    setAmount(amount);
  }, [items]);

  return (
    <Modal
      title="Your Cart"
      isOpen={isOpen}
      onClose={onClose}
      renderFooter={() =>
        items.length === 0 ? "" : <Button label="Checkout" type="primary" />
      }
    >
      <Text>
        <table
          style={{
            width: "100%",
            textAlign: "center",
            border: "1px solid",
          }}
        >
          <tr>
            <th style={{ width: "65%" }}>Item Name</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
          {items.map((item) => {
            return (
              <tr
                key={item.item_id}
                style={{ border: "1px solid", padding: "10px", height: "30px" }}
              >
                <td>{item.item_name}</td>
                <td>
                  <button onClick={() => removeItem(item.item_name)}>-</button>
                  <span
                    style={{
                      margin: "10px",
                      border: "1px solid black",
                      padding: "2px 5px",
                      borderRadius: "30%",
                    }}
                  >
                    {item.quantity}
                  </span>
                  <button onClick={() => addItem(item.item_name)}>+</button>
                </td>
                <td> $ {item.price * item.quantity}</td>
              </tr>
            );
          })}
        </table>
        <p
          style={{
            textAlign: "right",
            margin: "10px 5px 0px 15px",
          }}
        >
          Total Bill: ${totalAmount}
        </p>
      </Text>
    </Modal>
  );
}

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
