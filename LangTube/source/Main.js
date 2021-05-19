import React from "react";
import { StyleSheet, View } from "react-native";

/** 컴포넌트 */
import MainPage from "./pages/MainPage";

export default class Main extends React.Component {

    render() {
        
        return (
            <View style={styles.container}>
                <MainPage/>
            </View>
        )
    }
}

/** 스타일 */
const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});