import { DELIVERY_CHANGE_FIELD, DELIVERY_CLEAR } from "./types";

const deliveryDetailsInitialState = {
    deliveryDetails: {
        name: {
            name: "name",
            placeholder: "orderFormName",
            value: "",
            valid: false,
        },
        phone: {
            name: "phone",
            placeholder: "orderFormPhone",
            value: "",
            valid: false,
        },
        email: {
            name: "email",
            placeholder: "orderFormEmail",
            value: "",
            valid: false,
        },
        address: {
            name: "address",
            placeholder: "orderFormAddress",
            value: "",
            valid: false,
        },
        floor: {
            name: "floor",
            placeholder: "orderFormFloor",
            value: "",
            valid: true,
        },
        time: {
            name: "time",
            placeholder: "orderFormDeliveryTime",
            value: "",
            valid: false,
        },
        notes: {
            name: "notes",
            placeholder: "orderFormNotes",
            value: "",
            valid: true,
        },
    },
};

const deliveryDetailsReducer = ( state = deliveryDetailsInitialState, action ) => {
    switch (action.type) {

        /**
         * Изменяет поле в deliveryDetails
         */
         case DELIVERY_CHANGE_FIELD: {
            const newState = {...state};
            const { fieldName } = action;
            let valid = true;

            newState.deliveryDetails[fieldName].value = action.payload;
            newState.deliveryDetails[fieldName].valid = action.valid;

            for ( const [fn, data] of Object.entries(newState.deliveryDetails) ) {
                if ( !data.valid )
                    valid = false;
            }
            newState.allFieldsAreValid = valid;

            return newState;
        }

        /**
         * Очищает deliveryDetails
         */
        case DELIVERY_CLEAR: {
            const newState = {...state};
            newState.deliveryDetails = {
                name: {
                    name: "name",
                    placeholder: "orderFormName",
                    value: "",
                    valid: false,
                },
                email: {
                    name: "email",
                    placeholder: "orderFormPhone",
                    value: "",
                    valid: false,
                },
                phone: {
                    name: "phone",
                    placeholder: "orderFormPhone",
                    value: "",
                    valid: false,
                },
                address: {
                    name: "address",
                    placeholder: "orderFormAddress",
                    value: "",
                    valid: false,
                },
                floor: {
                    name: "floor",
                    placeholder: "orderFormFloor",
                    value: "",
                    valid: true,
                },
                notes: {
                    name: "notes",
                    placeholder: "orderFormNotes",
                    value: "",
                    valid: true,
                },
                time: {
                    name: "time",
                    placeholder: "orderFormDeliveryTime",
                    value: "",
                    valid: false,
                },
            };
            newState.allFieldsAreValid = false;

            return newState;
        }

        default: {
            return state;
        }
    }
};

export default deliveryDetailsReducer;