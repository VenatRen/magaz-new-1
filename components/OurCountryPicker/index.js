import React, { useState } from "react";
import { LayoutAnimation, TextInput, TouchableOpacity, View } from "react-native";
import PickerModal from "react-native-picker-modal-view";
import OurText from "~/components/OurText";
import PickerButton from "~/components/PickerButton";

import countries from "~/CountriesEnum.json";
import styles from "~/components/OurTextField/styles";
import { useDispatch, useSelector } from "react-redux";
import { ChangeDeliveryField } from "~/redux/DeliveryDetailsReducer/actions";

const OurCountryPicker = (props) => {
    const state = useSelector(state=>state.deliveryDetailsReducer);
    const dispatch = useDispatch();

    const onSelect = (select) => {
        dispatch(ChangeDeliveryField("country", countries[select.Value]));
    };

    return (
        <View style={styles.mainContainer}>
            <OurText style={[styles.placeholder,
                state.deliveryDetails.country.value ? styles.placeholderFocused : styles.placeholderUnfocused,
                state.deliveryDetails.country.valid ? styles.placeholderValid : styles.placeholderNotValid]} translate={true}>orderFormCountry</OurText>

            <PickerModal
                renderSelectView={(disabled, sel, showModal) =>
                    <TouchableOpacity activeOpacity={1} onPress={showModal} style={{
                        width: "100%"}}>
                        <TextInput style={[styles.textInput, state.deliveryDetails.country.valid ? styles.textInputValid : styles.textInputNotValid]}
                                   editable={false}
                                   value={state.deliveryDetails.country.value?.name}/>
                    </TouchableOpacity>
                }
                onSelected={onSelect}
                items={Object.entries(countries).map( (v, i) => ({ Name: v[1].name, Value: v[1].code, Id: i }) )}
                showToTopButton={true}
                selected={""}
                backButtonDisabled={true}
                showAlphabeticalIndex={true}
                autoGenerateAlphabeticalIndex={true}
                requireSelection={false}
                autoSort={false}
            />
        </View>
    );
};

export default OurCountryPicker;