import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";

/** 모듈 */
import { Actions } from "react-native-router-flux";   // 화면이동을 관리할 수 있게 해주는 모듈
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/Ionicons";

/** 컴포넌트 */
import { logoutUser } from "../actions/auth.actions";
import Logo from "../components/Logo";


/** 로그인 기능 수행 시 나타나는 프로필 페이지 */
class MyPage extends React.Component {

    /** 프로필 페이지로 이동 */
    profilePage() {
        Actions.profile();
    }
    /** 찜한 비디오 페이지로 이동 */
    videoLikePage() {
        Actions.videolike();

    }

    /** 찜한 채널 페이지로 이동 */
    channelLikePage() {
        Actions.channelLike();

    }
    /** 사용법 페이지로 이동 */
    useWayPage() {
        Actions.useway();
    }

    /** 개발자 정보 페이지로 이동 */
    infoPage() {
        Actions.developerinfo();
    }

    /** 로그아웃 시행 */
    logoutUser = () => {
        this.props.dispatch(logoutUser());
    }


    render() {
        const { getUser: { userDetails } } = this.props;

        /** 로그아웃 확인 메세지 */
        const logOutMessage = () =>
            Alert.alert(
                "", "로그아웃 하시겠습니까?",
                [{ text: "Cancel", onPress: () => console.log("Cancel Pressed") },
                { text: "OK", onPress: this.logoutUser }],
                { cancelable: false });

        return (
            <View style={styles.container}>

                <View style={styles.myPageContainer}>
                    {/* 로고 */}
                    <Logo />

                    {/* 빈공간 */}

                    <View style={{flex:0.2}}/>
                    {/* 내 계정 메뉴 */}
                    <View style={styles.textAlign01}>
                        <View style={styles.textTitle}>
                            <Text style={styles.menuStyle}> 내 계정</Text>
                        </View>
                        <View style={styles.textContent}>
                            <Text style={styles.textStyle}></Text>
                        </View>
                    </View>
                    {/* 프로필 정보 버튼 */}
                    <View style={styles.textAlign01}>
                        <View style={styles.textContent}>
                            <TouchableOpacity onPress={this.profilePage}>
                                <Text style={styles.buttonText01}> 프로필 정보</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.iconStyle}>
                            <Icon name="ios-person" size={20} color="#000000" />
                        </View>
                    </View>
                    {/* 내가 찜한 채널 */}
                    <View style={styles.textAlign01}>
                        <View style={styles.textContent}>
                            <TouchableOpacity onPress={this.channelLikePage}>
                                <Text style={styles.buttonText01}> 내가 찜한 채널</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.iconStyle}>
                            <Icon name="ios-film" size={20} color="#000000" />
                        </View>
                    </View>
                    {/* 내가 찜한 영상 */}
                    <View style={styles.textAlign01}>
                        <View style={styles.textContent}>
                            <TouchableOpacity onPress={this.videoLikePage}>
                                <Text style={styles.buttonText01}> 내가 찜한 영상</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.iconStyle}>
                            <Icon name="ios-videocam" size={20} color="#000000" />
                        </View>
                    </View>

                    {/* 정보 메뉴 */}
                    <View style={styles.textAlign02}>
                        <View style={styles.textTitle}>
                            <Text style={styles.menuStyle}> 정보</Text>
                        </View>
                        <View style={styles.textContent}>
                            <Text style={styles.textStyle}></Text>
                        </View>
                    </View>
                    {/* 시스템 사용법 버튼 */}
                    <View style={styles.textAlign01}>
                        <View style={styles.textContent}>
                            <TouchableOpacity onPress={this.useWayPage}>
                                <Text style={styles.buttonText01}> 시스템 사용법</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.iconStyle}>
                            <Icon name="ios-book" size={20} color="#000000" />
                        </View>
                    </View>
                    {/* 개발자 정보 버튼 */}
                    <View style={styles.textAlign01}>
                        <View style={styles.textContent}>
                            <TouchableOpacity onPress={this.infoPage}>
                                <Text style={styles.buttonText01}> 개발자 정보</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.iconStyle}>
                            <Icon name="ios-people" size={20} color="#000000" />
                        </View>
                    </View>

                    {/* 설정 메뉴 */}
                    <View style={styles.textAlign02}>
                        <View style={styles.textTitle}>
                            <Text style={styles.menuStyle}> 설정</Text>
                        </View>
                        <View style={styles.textContent}>
                            <Text style={styles.textStyle}></Text>
                        </View>
                    </View>
                    {/* 로그아웃 버튼 */}
                    <View style={styles.textAlign01}>
                        <View style={styles.textContent}>
                            <TouchableOpacity onPress={logOutMessage}>
                                <Text style={styles.buttonText02}> 로그아웃</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.iconStyle}>
                            <Icon name="ios-log-out" size={20} color="#E20606" />
                        </View>
                    </View>
                    
                    {/* 빈공간 */}
                    <View style={{flex:0.7}}/>
                </View>
            </View >
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

export default connect(mapStateToProps, mapDispatchToProps)(MyPage);

/** 스타일 */
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    myPageContainer: {
        flex: 1,
        backgroundColor: "#fff",
        marginTop: 30,
        alignItems: "center",
        justifyContent: "center",
    },
    textAlign01: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 15,
        paddingBottom: 15,
        height: 40,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        marginLeft: 15,
        marginRight: 15
    },
    textAlign02: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 15,
        marginBottom: 15,
        paddingBottom: 15,
        height: 40,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        marginLeft: 15,
        marginRight: 15
    },
    textTitle: {
        flex: 3,
        justifyContent: "flex-start",
        paddingLeft: 15
    },
    iconStyle: {
        flex: 3,
        alignItems: "flex-end",
        paddingRight: 20
    },
    textContent: {
        flex: 7,
        justifyContent: "flex-start",
        paddingLeft: 15
    },
    buttonContainer: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "flex-end",
        paddingBottom: 30
    },
    textStyle: {
        color: "#000000",
        fontSize: 18,
        fontWeight: "300"
    },
    menuStyle: {
        color: "#000000",
        fontSize: 18,
        fontWeight: "600"
    },
    logoutButton: {
        backgroundColor: "#000000",
        width: 300,
        borderRadius: 20,
        marginVertical: 9,
        paddingVertical: 12
    },
    logoutButtonText: {
        color: "#FFFFFF",
        fontSize: 20,
        fontWeight: "500",
        textAlign: "center"
    },
    buttonText01: {
        color: "#000000",
        fontSize: 18,
        fontWeight: "300"
    },
    buttonText02: {
        color: "#E20606",
        fontSize: 18,
        fontWeight: "300"
    }
});