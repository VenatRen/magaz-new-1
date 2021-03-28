import React, { useState, useLayoutEffect, useEffect } from "react";
import { View } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import {useDispatch, useSelector} from "react-redux";

import { SetUserData } from "~/actions";
import { USER_STATUS_NOT_CHECKED, USER_STATUS_REGISTERED, USER_STATUS_UNREGISTERED, USER_STATUS_LOGGED, USER_STATUS_LOGIN_SKIPPED } from "~/userStatus";
import { HeaderTitle } from "~/components/Header";
import OurActivityIndicator from "~/components/OurActivityIndicator";
import OurTextButton from "~/components/OurTextButton";
import OurText from "~/components/OurText";
import styles from "./styles";

const WelcomePage = (props) => {
    const { navigation } = props;

    const state = useSelector(state=>state);
    const dispatch = useDispatch();
    const status = state.user.status;

    const [loading, setLoading] = useState(status === USER_STATUS_NOT_CHECKED);
    const [gradStart, gradMiddle, gradEnd] = ["#B0E8E4", "#86A8E7","#7F7FD5"];

    const navigateToRegister = (e) => {
        navigation.navigate("RegisterPage");
    };

    const navigateToLogin = (e) => {
        navigation.navigate("LoginPage");
    };

    const navigateToCategoryList = (e) => {
        const user = {
            status: USER_STATUS_LOGIN_SKIPPED, // Состояние пользователя
            uuid: "",
            username: "",
            email: "",
            password: "",
            jwtAuthToken: "",
            jwtRefreshToken: "",
        };
        dispatch(SetUserData(user));
    };
    
    useEffect( () => {
        switch (status) {
            case USER_STATUS_REGISTERED: {
                setLoading(true);
                navigation.popToTop();
                navigation.navigate("CategoryList");
                break;
            };
            case USER_STATUS_LOGGED: {
                setLoading(false);
                navigation.popToTop();
                navigation.navigate("CategoryList");
                break;
            };
            case USER_STATUS_UNREGISTERED: {
                setLoading(false);
                break;
            };
            case USER_STATUS_LOGIN_SKIPPED: {
                navigation.navigate("CategoryList");
                break;
            };
            default:
                break;
        }
    }, [status]);

    useLayoutEffect( () => {
        navigation.setOptions({
            headerLeft: (props)=>{},
            headerCenter: (props)=>{},
            headerRight: (props)=>{},
            headerStyle: {
                backgroundColor: gradStart,
            },
        });
    }, [navigation]);

    return (
        <>
            <LinearGradient
                style={styles.background}
                locations={[0, .8, 1]}
                colors={[gradStart, gradMiddle, gradEnd]} />
            {
                loading ?
                    <OurActivityIndicator />
                :
                    <View style={styles.mainContainer}>
                        <View style={styles.topContainer}>
                            <OurText style={styles.title} translate={true}>welcomePageTitle</OurText>
                            <OurText style={styles.note} translate={true}>welcomePageNote</OurText>
                        </View>
                        <View style={styles.bottomContainer}>
                            <OurTextButton onPress={navigateToRegister} style={styles.button} textStyle={{color: gradEnd, fontSize: 20}} translate={true}>welcomePageRegister</OurTextButton>
                            <OurTextButton onPress={navigateToLogin} style={styles.button} textStyle={{color: gradEnd, fontSize: 20}} translate={true}>welcomePageLogin</OurTextButton>
                            <OurTextButton onPress={navigateToCategoryList} style={styles.button} textStyle={{color: gradEnd, fontSize: 20}} translate={true}>welcomePageContinue</OurTextButton>
                        </View>
                    </View>
            }
        </>
    );
};

export default WelcomePage;