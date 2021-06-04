import React, { useState, useLayoutEffect, useEffect } from "react";
import { Animated, FlatList, View } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch, useSelector } from "react-redux";
import { FetchOrderList } from "~/redux/OrdersReducer/actions";

import { HeaderBackButton, HeaderCartButton, HeaderTitle } from "~/components/Header/index";
import OurText from "~/components/OurText";
import OurActivityIndicator from "~/components/OurActivityIndicator";
import OrderItem from "./OrderItem";
import styles from "./styles"



const LocallyAnimatedFlatList = ({data, navigation}) => {
    const renderItemsBlock = ({item, index}) => {
        return (
            <OrderItem navigation={navigation} data={item}/>
        );
    };

    return (
        <FlatList
            style={styles.flatList}
            data={data}
            renderItem={renderItemsBlock}
            keyExtractor={(item, index) => String(index)}
        />
    )
};

const MemoedLocallyAnimatedFlatList = React.memo(LocallyAnimatedFlatList);

const Orders = (props) => {
    const { navigation } = props;
    const state = useSelector(state=>state);
    const dispatch = useDispatch();

    const [gradStart, gradEnd] = ["#931DC4", "#F33BC8"];

    useEffect( () => {
        dispatch(FetchOrderList);
    }, [] );

    useLayoutEffect( () => {
        navigation.setOptions({
            headerLeft: (props)=><HeaderBackButton navigation={navigation}/>,
            headerCenter: (props)=><HeaderTitle navigation={navigation} title={"ordersTitle"}/>,
            headerRight: (props)=><HeaderCartButton navigation={navigation}/>,
            headerStyle: {
                backgroundColor: gradStart,
            },
        });
    }, [navigation]);

    return (
        <>
        <LinearGradient style={styles.background} locations={[0, 1.0]} colors={[gradStart, gradEnd]}/>
        <View style={styles.mainContainer}>
        {
        	state.ordersReducer.orderList.size === 0 ?
        		<View style={styles.emptyTextContainer}>
        			<OurText style={styles.emptyText} translate={true}>ordersEmpty</OurText>
        		</View>
            :
        	state.ordersReducer.loading ?
                <OurActivityIndicator size={64} color={"#fff"} />
            :
        		<MemoedLocallyAnimatedFlatList navigation={navigation} data={Array.from(state.ordersReducer.orderList.values())}/>
        }
        </View>
        </>
    );
};

export default Orders;