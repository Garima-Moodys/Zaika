import { useContext, useEffect, useState } from "react";
import { Modal, Button } from "@passfort/castle";
import { Text } from "@passfort/castle";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";
import { CartContext } from "../context/CartContext";


const stripePromise = loadStripe(
  "pk_test_51Q3LtGFCMz513c02dQDNqogPulrhZunRKffXTl2UBJqMwsKheFWH4WLdKM1W8LSvdd9VIZYPcvYuLHYL7xPtVuTp00Zh4JtIKa"
);

export default function CartModal({ isOpen, onClose }) {
  const { items, addItem, removeItem } = useContext(CartContext);
  const [totalAmount, setAmount] = useState(0);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  useEffect(() => {
    let amount = 0;
    for (let i = 0; i < items.length; i++) {
      amount += items[i].price * items[i].quantity;
    }
    setAmount(amount);
  }, [items]);

  return (
    <Modal
      title={isCheckingOut ? "Checkout" : "Your Cart"}
      isOpen={isOpen}
      onClose={onClose}
      renderFooter={() =>
        items.length === 0 ? (
          ""
        ) : isCheckingOut ? (
          <Button
            label="Go Back"
            type="primary"
            onClick={() => setIsCheckingOut(false)}
          ></Button>
        ) : (
          <Button label="Checkout" type="primary" onClick={()=>setIsCheckingOut(true)} />
        )
      }
    >
      {isCheckingOut ? (
        <Elements stripe={stripePromise}>
          <PaymentForm
            totalAmount={totalAmount}
            onClose={onClose}
            setIsCheckingOut={setIsCheckingOut}
          />
        </Elements>
      ) : (
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
              <th>Price(&#8377;)</th>
            </tr>
            {items.map((item) => {
              return (
                <tr
                  key={item.item_id}
                  style={{
                    border: "1px solid",
                    padding: "10px",
                    height: "30px",
                  }}
                >
                  <td>{item.item_name}</td>
                  <td>
                    <button onClick={() => removeItem(item.item_name)}>
                      -
                    </button>
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
                  <td>{item.price * item.quantity}</td>
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
            Total Bill: &#8377; {totalAmount}
          </p>
        </Text>
      )}
    </Modal>
  );
}