import {  } from "./types";

export const initialOrdersState = {
    orderList: new Map(), // Список товаров
};

const ordersReducer = ( state = initialOrdersState, action ) => {
    switch (action.type) {        

        default: {
            return state;
        }
    }
};

export default ordersReducer;