import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

/** 모듈 */
import { Actions } from "react-native-router-flux";
import Icon from "react-native-vector-icons/Ionicons";


export default class DeveloperInfo extends React.Component {

    /** 프로필 페이지로 이동 */
    myPage() {
        Actions.pop();
    }

    render() {

        return (
            <View style={styles.container}>
                
                {/* 뒤로 가기 버튼 */}
                <View style={styles.backButtonContainer}>
                    <TouchableOpacity style={styles.backButtonStyle} onPress={this.myPage}>
                        <Icon name="ios-arrow-back" size={18} color="#000000" />
                        <Text style={styles.buttonTextStyle}>  뒤로 가기</Text>
                    </TouchableOpacity>
                </View>
                
                 {/* 툴바 */}
                 <View style={styles.navBarStyle} >
                    <Text style={styles.titleTextStyle}>개발자 정보 </Text>
                </View >

                {/* 빈공간 */}
                <View style={styles.blankContainer01} />

                <View style={styles.infoDetails}>
                    <Text style={styles.infoName}>이름 : 김덕중</Text>
                    <Text style={styles.infoStats}>소속 : 영남대학교 컴퓨터 공학과</Text>
                    <Text style={styles.infoStats}>학번 : 21621904</Text>
                </View>
                <View style={styles.infoDetails}>
                    <Text style={styles.infoName}>이름 : 류한웅</Text>
                    <Text style={styles.infoStats}>소속 : 영남대학교 컴퓨터 공학과</Text>
                    <Text style={styles.infoStats}>학번 : 21611726</Text>
                </View>
                <View style={styles.infoDetails}>
                    <Text style={styles.infoName}>이름 : 박기찬</Text>
                    <Text style={styles.infoStats}>소속 : 영남대학교 컴퓨터 공학과</Text>
                    <Text style={styles.infoStats}>학번 : 21611728</Text>
                </View>
                <View style={styles.infoDetails}>
                    <Text style={styles.infoName}>이름 : 임빈영</Text>
                    <Text style={styles.infoStats}>소속 : 영남대학교 컴퓨터 공학과</Text>
                    <Text style={styles.infoStats}>학번 : 21611760</Text>
                </View>
                <View style={styles.infoDetails}>
                    <Text style={styles.infoName}>이름 : 허준호</Text>
                    <Text style={styles.infoStats}>소속 : 영남대학교 컴퓨터 공학과</Text>
                    <Text style={styles.infoStats}>학번 : 21611782</Text>
                </View>

                {/* 빈공간 */}
                <View style={styles.blankContainer02} />
            </View>
        )
    }
}

/** 스타일 */
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    navBarStyle: {
        flex: 0.5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderColor: "#F2F2F2",
        borderWidth: 1,
        backgroundColor:"#F2F2F2",
        marginLeft:10,
        marginRight:10,
        borderRadius:20
    },
    titleTextStyle:{
        fontSize: 20,
        fontWeight: "400",
        alignItems: "center",
        justifyContent: "center"
    },
    backButtonContainer:{
        flex: 0.5,
        flexDirection: "row",
        marginLeft: 15,
        marginTop: 70
    },
    backButtonStyle:{
        flexDirection: "row",
        borderBottomColor: "black"
    },
    buttonTextStyle:{
        fontSize:16
    },
    blankContainer01: {
        flex: 1
    },
    blankContainer02: {
        flex: 2
    },
    infoName: {
        fontSize: 16,
        color: '#3c3c3c'
    },
    infoDetails: {
        paddingHorizontal: 15,
        flex: 1,
        alignItems: "flex-start",
        justifyContent: "center",
        borderBottomColor: "black",
        borderBottomWidth: 1,
        paddingLeft: 30,
        marginLeft: 15,
        marginRight: 15
    },
    infoStats: {
        fontSize: 15,
        paddingTop: 3,
        color: "grey"
    }
});