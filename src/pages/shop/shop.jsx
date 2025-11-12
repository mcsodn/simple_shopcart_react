import { Link } from "react-router-dom";
import styles from "./shop.module.css";

function Shop(props) {
  return (
    <div>
      {props.data.map((product) => (
        <div key={product.id}>
          <Link to={`/product/${product.id}`}>{product.name}</Link>
        </div>
      ))}
    </div>
  );
}

export default Shop;
