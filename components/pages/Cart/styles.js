import { StyleSheet, Dimensions } from "react-native";

// CART PAGE STYLES

const styles = StyleSheet.create({
    flatList: {
        width: "100%",
    },
    cartList: {
        flexDirection: "column",
    },
    gradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        minHeight: "100%",
    },
    items: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
    },
    emptyText: {
        marginTop: 18,
        color: "#fff",
        fontSize: 24,
        textAlign: "center",
    },
    cartIcon: {
        width: 140,
        borderBottomWidth: 1,
        borderColor: "#FFF",
        alignItems: "center",
        justifyContent: "flex-end",
        marginBottom: 8,
    },
    bottomContainer: {
        paddingHorizontal: 12,
        width: "100%",
    },
    checkoutButton: {
        width: "100%",
        left: 0,
        right: 0,
        bottom: 0,
        marginTop: 8,
        marginBottom: 30,
    },
    loadingContainer: {
        alignItems: "center",
        justifyContent: "center",

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
 
        backgroundColor: "#fffffffa",
        borderRadius: 100,
    },
});

export default styles;