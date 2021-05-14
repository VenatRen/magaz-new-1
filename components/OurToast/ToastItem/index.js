import React, { useEffect, useState, useRef }  from "react";
import { Animated, Easing, Dimensions, View, LayoutAnimation } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { DeleteToast } from "~/redux/ToastReducer/actions";
import OurText from "~/components/OurText";
import styles from "./styles";

const ANIMATION_DURATION = 200;
const TOAST_HEIGHT_MIN = 0;
const TOAST_HEIGHT_MAX = 48;

const ToastItem = (props) => {
    const { id, duration, text, icon, color, translate, postDelete } = props;
    const dispatch = useDispatch();
    const [timer, setTimer] = useState(null);
    const anim = useRef(new Animated.Value(0)).current;
    //const posX = useRef(new Animated.Value(Dimensions.get("screen").width)).current;
    
    // Анимация появления
    const animIn = () => {

        // Запускаем анимацию
        Animated.timing(anim, {
            toValue: 1,
            easing: Easing.bounce,
            duration: ANIMATION_DURATION,
            useNativeDriver: true,
        }).start();
    };

    // Анимация исчезновения
    const animOut = () => {
        // Запускаем анимацию
        Animated.timing(anim, {
            toValue: 2,
            duration: ANIMATION_DURATION,
            useNativeDriver: true,
        }).start( () => {
            // Удаляем элемент после окончания анимации
            dispatch(DeleteToast(id));
            if ( postDelete )
                postDelete();
        } );
    };

    useEffect(() => {
        animIn();

        if ( timer ) {
            clearTimeout(timer);
        }
        
        setTimer(setTimeout(() => {
            animOut();
        }, duration));

    }, [duration]);

    const screenHeight = Dimensions.get("screen").height;
    const opacity = anim.interpolate({
        inputRange: [0, 1, 1.2],
        outputRange: [0, 1, 0],
        extrapolateRight: "clamp",
    });
    const translateY = anim.interpolate({
        inputRange: [0, 1, 2],
        outputRange: [screenHeight, 0, -screenHeight],
        extrapolateRight: "clamp",
    });

    return (
        <Animated.View style={[styles.mainContainer, {height: TOAST_HEIGHT_MAX, opacity, transform: [{ translateY }] }]}>
            <View style={{position: "absolute", backgroundColor: color, height: TOAST_HEIGHT_MAX, width: 16, left: 0}}/>
            <>
            {
                icon ?
                    <View style={styles.iconContainer}>
                        <FontAwesomeIcon icon={icon} size={32} color={color} />
                    </View>
                :   <></>
            }
            </>
            <View style={styles.textContainer}>
                <OurText style={[styles.text, {color}]} translate={translate}>{text}</OurText>
            </View>
        </Animated.View>
    );
};

export default React.memo(ToastItem);