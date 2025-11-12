import ProductList from "../../components/ProductList/ProductList";

function ShopPageElement({ products }) {
  return (
    <div>
      <h2>Каталог товаров</h2>
      <ProductList products={products} />
    </div>
  );
}

export default ShopPageElement;
