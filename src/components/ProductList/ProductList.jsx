import { Link } from "react-router-dom";
import styles from "./ProductList.module.css";

function ProductList({ products }) {
  return (
    <div className={`${styles.product_list__wrapper}`}>
      <div className={`${styles.product_list}`}>
        {products.map((product) => (
          <div key={product.id} className={`${styles.product_list__item}`}>
            <Link to={`/product/${product.id}`}>
              <img
                src={product.colors[0].images[0]}
                alt={product.name}
                className={`${styles.product_list__img}`}
              />
              {product.name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
