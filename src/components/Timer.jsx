import { View, Text, StyleSheet } from "react-native";

export default function Timer({ time }) {
    const formatedTime = `${Math.floor(time / 60).toString().padStart(2, "0")}:${(time % 60).toString().padStart(2, "0")
        } `
    return (
        <View style={styles.container}>
            <Text style={styles.timeText}>{formatedTime}</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: .3,
        justifyContent: "center",
        backgroundColor: "#F2F2F2",
        padding: 15,
        borderRadius: 15
    },
    timeText: {
        textAlign: "center",
        fontSize: 80,
        fontWeight: "bold",
        color: "#333"
    }
})