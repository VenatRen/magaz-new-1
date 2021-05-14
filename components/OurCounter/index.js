import React from "react";
import { TextInput, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

import OurIconButton from "~/components/OurIconButton";
import OurText from "~/components/OurText";
import styles from "./styles";


const OurCounter = (props) => {
    const { color, onChange, value, maxLength } = props;

    const plusPressed = (e) => {
        onChange(value + 1);
    };
    const minusPressed = (e) => {
        onChange(value - 1);
    };

    return (
        <View style={styles.mainContainer}>
            <OurIconButton onPress={plusPressed}
                           style={[styles.button, styles.buttonLeft]}
                           icon={faPlus}
                           color={color}
                           doLongPress={true}/>
            <TextInput maxLength={maxLength} onChangeText={onChange} style={styles.textInput} value={String(value)} keyboardType="phone-pad"/>
            <OurIconButton onPress={minusPressed}
                           style={[styles.button, styles.buttonRight]}
                           icon={faMinus}
                           color={color}
                           doLongPress={true}/>
        </View>
    );
};

export default OurCounter;