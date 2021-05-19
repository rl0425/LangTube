import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

/** 모듈 */
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/Ionicons";


class Profile extends React.Component {
    /** 프로필 페이지로 이동 */
    myPage() {
        Actions.pop();
    }

    render() {
        const { getUser: { userDetails } } = this.props;

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
                    <Text style={styles.titleTextStyle}>프로필 정보 </Text>
                </View >

                {/* 빈공간 */}
                <View style={styles.blankContainer01} />
                {/* 빈공간 */}
                <View style={styles.blankContainer02} />

                {/* 이름 정보 */}
                <View style={styles.textAlign}>
                    <View style={styles.textTitle}>
                        <Text style={styles.textStyle}> 이름</Text>
                    </View>
                    <View style={styles.textContent}>
                        <Text style={styles.textStyle}>{userDetails ? userDetails.name : ""}</Text>
                    </View>
                </View>

                {/* 계정 정보 */}
                <View style={styles.textAlign}>
                    <View style={styles.textTitle}>
                        <Text style={styles.textStyle}> 계정</Text>
                    </View>
                    <View style={styles.textContent}>
                        <Text style={styles.textStyle}>{userDetails ? userDetails.email : ""}</Text>
                    </View>
                </View>

                {/* 빈공간 */}
                <View style={styles.blankContainer02} />

                {/* 빈공간 */}
                <View style={styles.blankContainer02} />
            </View>

        )
    }
}

/** store가 업데이트 될때마다 자동으로 호출 */
/** connect함수 첫번째 인자로 들어감 */
mapStateToProps = (state) => ({
    getUser: state.userReducer.getUser
});

/** store에 접근한 컴포넌트가 store의 상태를 바꾸기 위해 사용 */
/** connect함수 두번째 인자로 들어감 */
mapDispatchToProps = (dispatch) => ({
    dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

/** 스타일 */
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    navBarStyle: {
        flex: 0.5,
        borderColor: "#F2F2F2",
        borderWidth: 1,
        borderRadius:20,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor:"#F2F2F2",
        marginLeft:10,
        marginRight:10
    },
    titleTextStyle:{
        fontSize: 20,
        fontWeight: "400",
        alignItems: "center",
        justifyContent: "center"
    },
    blankContainer01: {
        flex: 1
    },
    blankContainer02: {
        flex: 2
    },
    backButtonContainer: {
        flex: 0.5,
        flexDirection: "row",
        marginLeft: 15,
        marginTop: 70
    },
    backButtonStyle: {
        flexDirection: "row",
        borderBottomColor: "black"
    },
    buttonTextStyle: {
        fontSize: 16
    },
    textAlign: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        marginBottom: 15,
        paddingBottom: 15,
        height: 40,
        borderBottomColor: "black",
        borderBottomWidth: 1,
        marginLeft: 15,
        marginRight: 15
    },
    textTitle: {
        flex: 3,
        justifyContent: "flex-start",
        paddingLeft: 15
    },
    textContent: {
        flex: 7,
        justifyContent: "flex-start"
    },
    textStyle: {
        color: "#000000",
        fontSize: 18,
        fontWeight: "300"
    }
});