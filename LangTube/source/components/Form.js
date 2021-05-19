import React from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from "react-native";

/** 로그인, 회원가입 양식 */
export default class Form extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                {/* 이메일 입력창 */}
                <TextInput style={styles.inputText}
                    placeholder=" Email"
                    selectionColor="#6E6E6E"
                    keyboardType="email-address"
                    onSubmitEditing={() => this.password.focus()} />
                {/* 비밀번호 입력창 */}
                <TextInput style={styles.inputText}
                    placeholder=" Password"
                    secureTextEntry={true}
                    selectionColor="#6E6E6E"
                    ref={(input) => this.password = input} />

                <TouchableOpacity style={styles.loginButton}>
                    <Text style={styles.loginButtonText}>{this.props.type}</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

/** 스타일 */
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        marginVertical: 100
    },
    inputText: {
        width: 300,
        borderLeftWidth: 2,
        borderRightWidth: 2,
        borderBottomWidth: 2,
        borderTopWidth: 2,
        fontSize: 20,
        marginVertical: 9,
        paddingVertical: 9,
        borderRadius: 20
    },
    loginButton: {
        backgroundColor: "#000000",
        width: 300,
        borderRadius: 20,
        marginVertical: 9,
        paddingVertical: 12
    },
    loginButtonText: {
        color: "#FFFFFF",
        fontSize: 20,
        fontWeight: "500",
        textAlign: "center"
    }
});