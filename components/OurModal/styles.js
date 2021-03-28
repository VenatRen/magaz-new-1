import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    mainContainer: {
        padding: 8,
        paddingTop: 12,
        minHeight: 120,
        backgroundColor: "#fff",
        borderRadius: 1.5,
        alignItems: "center",
        justifyContent: "space-between",
    },
    topContainer: {
    },
    title: {
        color: "#383838",
        fontWeight: "bold",
        fontSize: 16,
        textAlign: "center",
    },
    middleContainer: {
    },
    text: {
        fontSize: 16,
        textAlign: "center",
    },
    bottomContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        alignSelf: "flex-end",
    },
    button: {
        borderRadius: 1,
        paddingHorizontal: 10,
        margin: 2,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0,
        shadowRadius: 0,

        elevation: 0,
        backgroundColor: null,
    },
    buttonText: {
        color: "#fc0341",
        textTransform: "uppercase",
    },
});

export default styles;