import { MODAL_SHOW, MODAL_CLOSE, MODAL_TOGGLE } from "./types";

export const ShowModal = (data={}) => {
    return {type: MODAL_SHOW, payload: data};
};

export const CloseModal = () => {
    return {type: MODAL_CLOSE};
};

export const ToggleModal = (data={}) => {
    return {type: MODAL_TOGGLE, payload: data};
};