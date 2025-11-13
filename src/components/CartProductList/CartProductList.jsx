import styles from "./CartProductList.module.css";

function CartProductList({ dispatch, cartItems, products, sizes }) {
  const handleDeleteFromCart = (productId, colorId, sizeId) => {
    dispatch({
      type: "REMOVE_ITEM",
      payload: { productId: productId, colorId: colorId, sizeId: sizeId },
    });
  };
  return Object.values(cartItems).length > 0 ? (
    <div>
      {Object.values(cartItems).map((product, index) => {
        const { productId, colorId, sizeId, quantity } = product;
        const picUrl = products
          .find((v) => v.id === productId)
          .colors.find((v) => v.id === colorId).images[0];
        const productName = products.find((v) => v.id === productId).name;
        const productColor = products
          .find((v) => v.id === productId)
          .colors.find((v) => v.id === colorId).name;
        const productSize = sizes.find((v) => v.id === sizeId).label;

        return (
          <div className={`${styles.cartItems__list}`} key={index}>
            <img src={picUrl} alt="" className={`${styles.cartItems__img}`} />
            <div className={`${styles.cartItem__description}`}>
              <h3>{productName}</h3>
              <p>цвет: {productColor}</p>
              <p>размер: {productSize}</p>
            </div>

            <div>Кол-во: {quantity}</div>
            <button
              onClick={() => {
                handleDeleteFromCart(productId, colorId, sizeId);
              }}
            >
              Удалить
            </button>
          </div>
        );
      })}
    </div>
  ) : (
    <p>Корзина пуста</p>
  );
}

export default CartProductList;
