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
          total: productsInCart.total + 1,
        };
      } else {
        return {
          ...productsInCart,
          items: {
            ...productsInCart.items,
            [objKey]: {
              ...productsInCart.items[objKey],
              quantity: productsInCart.items[objKey].quantity + 1,
            },
          },
          total: productsInCart.total + 1,
        };
      }
    }

    case "REMOVE_ITEM": {
      const { productId, colorId, sizeId } = action.payload;
      const objKey = [productId, colorId, sizeId]
        .map(String)
        .reduce((acc, val) => (acc += val));

      if (productsInCart.items[objKey]) {
        const quantityDel = productsInCart.items[objKey].quantity;

        const newItems = {
          ...productsInCart.items,
        };
        delete newItems[objKey];

        return {
          ...productsInCart,
          items: newItems,
          total: productsInCart.total - quantityDel,
        };
      }

      return productsInCart;
    }

    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
};
