import CartProductList from "../../components/CartProductList/CartProductList";

function CartPageElement({ dispatch, cartItems, products, sizes }) {
  return (
    <div>
      <h2>Корзина</h2>
      <CartProductList
        dispatch={dispatch}
        cartItems={cartItems}
        products={products}
        sizes={sizes}
      />
    </div>
  );
}

export default CartPageElement;
