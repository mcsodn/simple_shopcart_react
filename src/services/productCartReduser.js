export const productsInCartInit = {
  items: {},
  total: 0,
};

export const productCartReducer = (productsInCart, action) => {
  switch (action.type) {
    case "ADD_ITEM": {
      const { productId, colorId, sizeId } = action.payload;
      const objKey = [productId, colorId, sizeId]
        .map(String)
        .reduce((acc, val) => (acc += val));
      if (!productsInCart.items[objKey]) {
        return {
          ...productsInCart,
          items: {
            ...productsInCart.items,
            [objKey]: {
              productId,
              colorId,
              sizeId,
              quantity: 1,
            },
          },
          total: productsInCart.total++,
        };
      } else {
        return {
          ...productsInCart,
          items: {
            ...productsInCart.items,
            [objKey]: {
              productId,
              colorId,
              sizeId,
              quantity: productsInCart.items[objKey].quantity++,
            },
          },
          total: productsInCart.total++,
        };
      }
    }
    case "REMOVE_ITEM": {
      const { productId, colorId, sizeId } = action.payload;
      const objKey = [productId, colorId, sizeId]
        .map(String)
        .reduce((acc, val) => (acc += val));
      if (productsInCart.items[objKey]) {
        const newItems = productsInCart.items;
        delete newItems[objKey];
        return {
          items: newItems,
          total: Object.values(productsInCart.items)
            .map((v) => v.quantity)
            .reduce((acc, val) => (acc += val)),
        };
      } else {
        return productsInCart;
      }
    }

    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
};
