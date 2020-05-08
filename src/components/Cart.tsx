import React from "react";
import styles from "./Cart.module.scss";

const Cart: React.FC = () => {
  return (
    <div className={styles.cartIcon}>
      <span className={styles.cartCount}>0</span>
    </div>
  );
};

export default Cart;
