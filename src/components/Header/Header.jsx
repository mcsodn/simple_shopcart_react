import { Link } from "react-router-dom";
import styles from "./Header.module.css";

function Header() {
  return (
    <div className={`${styles.header__block}`}>
      <div className={`${styles.header__links}`}>
        <Link to="/">Каталог</Link>
        <Link to="cart">Корзина</Link>
      </div>
    </div>
  );
}

export default Header;
