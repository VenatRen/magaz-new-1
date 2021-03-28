import { CART_SET_PRODUCT_LIST, CART_SET_LOADING, CART_SET_ERROR } from "./types";

export const initialCartState = {
    productList: new Map(), // Список товаров
    loading: false,
    error: false,
    total: 0, // Итоговая цена
};

const cartReducer = ( state = initialCartState, action ) => {
    switch (action.type) {

        /*
         * Устанавливает список товаров в корзине
         */
        case CART_SET_PRODUCT_LIST: {
            const newState = {...state};
            const { productList, total } = action;

            const cart = new Map();

            productList.map( (v, i) => {
                cart.set(v.product.databaseId, v);
            });

            newState.productList = cart;
            newState.total = total;
            return newState;
        }

        case CART_SET_LOADING: {
            const newState = {...state};
            const { loading } = action;

            newState.loading = loading;
            return newState;
        }

        case CART_SET_ERROR: {
            const newState = {...state};
            const { error } = action;

            newState.error = error;
            return newState;
        }

        default: {
            return state;
        }
    }
};

export default cartReducer;