import { useParams } from "react-router-dom";
import ProductCard from "../../components/ProductCard/ProductCard";

function ProductPageElement() {
  const { id } = useParams();

  return <ProductCard id={id} />;
}

export default ProductPageElement;
