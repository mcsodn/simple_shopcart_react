import { Link } from "react-router-dom";
import styles from "./Header.module.css";

function Header({ cartTotal }) {
  return (
    <div className={`${styles.header__block}`}>
      <div className={`${styles.header__links}`}>
        <Link to="/">Каталог</Link>
        <Link to="cart">Корзина: {cartTotal}</Link>
      </div>
    </div>
  );
}

export default Header;
