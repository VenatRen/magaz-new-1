import React, { useEffect, useState, useRef }  from "react";
import { Animated, Easing, Dimensions, View, LayoutAnimation } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { DeleteToast } from "~/redux/ToastReducer/actions";
import OurText from "~/components/OurText";
import styles from "./styles";

const ANIMATION_DURATION = 200;
const TOAST_HEIGHT_MIN = .00001;
const TOAST_HEIGHT_MAX = 64;

const easeInEaseOut = LayoutAnimation.create(
    ANIMATION_DURATION,
    LayoutAnimation.Types.easeInEaseOut,
    LayoutAnimation.Properties.scaleY,
);

const ToastItem = (props) => {
    const { id, duration, text, icon, color, translate } = props;
    const dispatch = useDispatch();
    const [timer, setTimer] = useState(null);
    const [height, setHeight] = useState(TOAST_HEIGHT_MIN);
    const anim = useRef(new Animated.Value(0)).current;
    //const posX = useRef(new Animated.Value(Dimensions.get("screen").width)).current;
    
    // Анимация появления
    const animIn = () => {
        // Анимируем высоту
        LayoutAnimation.configureNext(easeInEaseOut);
        setHeight(TOAST_HEIGHT_MAX);
        
        // Запускаем анимацию
        Animated.timing(anim, {
            toValue: 1,
            duration: ANIMATION_DURATION,
            useNativeDriver: true,
        }).start();
    };

    // Анимация исчезновения
    const animOut = () => {
        // Анимируем высоту
        LayoutAnimation.configureNext(easeInEaseOut);
        setHeight(TOAST_HEIGHT_MIN);
        
        // Запускаем анимацию
        Animated.timing(anim, {
            toValue: 2,
            duration: ANIMATION_DURATION,
            useNativeDriver: true,
        }).start( () => {
            // Удаляем элемент после окончания анимации
            dispatch(DeleteToast(id));
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

    const screenWidth = Dimensions.get("screen").width;
    const opacity = anim.interpolate({
        inputRange: [0, 1, 2],
        outputRange: [0, 1, 0],
        extrapolateRight: "clamp",
    });
    const translateX = anim.interpolate({
        inputRange: [0, 1, 2],
        outputRange: [screenWidth, 0, -screenWidth],
        extrapolateRight: "clamp",
    });

    return (
        <Animated.View style={[styles.mainContainer, {height, opacity, transform: [{ translateX }] }]}>
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