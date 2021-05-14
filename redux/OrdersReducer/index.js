import { ORDERS_SET_LIST, ORDERS_SET_LOADING, ORDERS_SET_ERROR, } from "./types";

export const initialOrdersState = {
    orderList: new Map(), // Список товаров
    loading: false,
    error: false,
};

const ordersReducer = ( state = initialOrdersState, action ) => {
    switch (action.type) {        

        /*
         * Устанавливает список заказов
         */
        case ORDERS_SET_LIST: {
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

        case ORDERS_SET_LOADING: {
            const newState = {...state};
            const { loading } = action;

            newState.loading = loading;
            return newState;
        }

        case ORDERS_SET_ERROR: {
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

export default ordersReducer;