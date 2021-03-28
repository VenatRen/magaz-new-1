import React from "react";
import { KeyboardAvoidingView } from "react-native";
import { useSelector } from "react-redux";

import ToastItem from "./ToastItem";
import styles from "./styles";

const OurToast = (props) => {
    const state = useSelector(state=>state);
    const toasts = Array.from(state.toastReducer.toastList.values());

    return (
        <KeyboardAvoidingView behavior={"padding"} pointerEvents="box-none" style={styles.mainContainer}>
            {
                toasts.map( (toast, index) => 
                    <ToastItem duration={toast.duration} id={toast.id} text={toast.text} translate={toast.translate} color={toast.color} icon={toast.icon} key={toast.id} />
                )
            }
        </KeyboardAvoidingView>
    );
};

export default OurToast;