import { useState, useEffect } from "react";
import { getProduct, getSizes } from "../../services/api";
import styles from "./ProductCard.module.css";

function ProductCard({ id }) {
  const [productState, setProductState] = useState({
    productID: id,
    loading: true,
    error: null,
    productData: null,
    sizeData: null,
    selectedColor: null,
    selectedSize: null,
  });

  const getSizeLabelByID = (id) => {
    return productState.sizeData.find((size) => size.id === id).label;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [dataProduct, dataSizes] = await Promise.all([
          getProduct(productState.productID),
          getSizes(),
        ]);

        setProductState((prevState) => {
          return {
            ...prevState,
            productData: dataProduct,
            selectedColor: dataProduct.colors[0].id,
            selectedSize: dataProduct.colors[0].sizes[0],
            sizeData: dataSizes,
          };
        });
      } catch (error) {
        setProductState((prevState) => {
          return { ...prevState, error: error, loading: false };
        });
      } finally {
        setProductState((prevState) => {
          return { ...prevState, loading: false };
        });
      }
    };

    fetchData();
  }, [productState.productID]);

  const handleChangeColor = (event) => {
    setProductState((prevState) => {
      return {
        ...prevState,
        selectedColor: productState.productData.colors.find(
          (color) => color.name === event.target.value
        ).id,
      };
    });
  };

  const handleChangeSize = (event) => {
    setProductState((prevState) => {
      return {
        ...prevState,
        selectedSize: event.target.value,
      };
    });
  };

  if (productState.loading) return <div>Загрузка...</div>;
  if (productState.error) return <div>Ошибка загрузки товара</div>;

  return (
    <div>
      <h2>{productState.productData.name}</h2>
      {productState.productData.colors[
        productState.selectedColor - 1
      ].images.map((imageUrl, index) => (
        <img
          src={imageUrl}
          key={index}
          alt={productState.productData.name}
          className={`${styles.product_card__img}`}
        />
      ))}
      <p>
        {+productState.productData.colors[productState.selectedColor - 1].price}{" "}
        руб.
      </p>
      <p>
        {
          productState.productData.colors[productState.selectedColor - 1]
            .description
        }
      </p>
      <label htmlFor="color-select">Цвет: </label>
      <select name="color" id="color-select" onChange={handleChangeColor}>
        {productState.productData.colors.map((color) => (
          <option key={color.id}>{color.name}</option>
        ))}
      </select>
      <p></p>
      <label htmlFor="size-select">Размеры: </label>
      {productState.productData.colors.find(
        (color) => color.id === productState.selectedColor
      ).sizes.length > 0 ? (
        <>
          <select name="size" id="size-select" onChange={handleChangeSize}>
            {productState.productData.colors
              .find((color) => color.id === productState.selectedColor)
              .sizes.map((sizeId) => (
                <option value={sizeId} key={sizeId}>
                  {getSizeLabelByID(sizeId)}
                </option>
              ))}
          </select>
          <p></p>
          <button type="button">В корзину</button>
        </>
      ) : (
        <>
          <span>нет доступных размеров</span>
          <p></p>
          <button type="button" disabled>
            В корзину
          </button>
        </>
      )}
    </div>
  );
}

export default ProductCard;
