import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";

import cartReducer from "./CartReducer";
import modalReducer from "./ModalReducer";
import toastReducer from "./ToastReducer";
import ordersReducer from "./OrdersReducer";
import deliveryDetailsReducer from "./DeliveryDetailsReducer";

const reducer = combineReducers({
    cartReducer,
    modalReducer,
    toastReducer,
    ordersReducer,
    deliveryDetailsReducer,
});

const store = createStore(reducer, compose(
    applyMiddleware(thunk),
    (window && (window).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)()
));

export default store;