import React from "react";
import { StyleSheet, View, Image } from "react-native";

/** 앱 로고 */
export default class ToolBarLogo extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Image
                    source={require("../Images/Logo2.png")}
                    style={{ width: 90, height: 45 }}>
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
        alignItems: "flex-start"
    }
});