import { useParams } from "react-router-dom";
import ProductCard from "../../components/ProductCard/ProductCard";

function ProductPageElement({ dispatch }) {
  const { id } = useParams();

  return <ProductCard id={+id} dispatch={dispatch} />;
}

export default ProductPageElement;
