import React from "react";
import { StyleSheet, View, Image } from "react-native";

/** 앱 로고 */
export default class Logo extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Image
                    source={require("../Images/Logo2.png")}
                    style={{ width: 200, height: 100 }}>
                </Image>
            </View>

        )
    }

}

/** 스타일 */
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center"
    }
});