import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

/** 모듈 */
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/Ionicons";

/** 컴포넌트 */
import Channel from "./Channel";
import Video from "./Video";
import LoginRoutes from "../components/LoginRoutes";


class MainPage extends React.Component {

    /** 생성자 */
    constructor(props) {
        super(props)
        this.state = {
            mode: 3   // 초기 페이지는 로그인 페이지
        };
    }

    /** 페이지별 화면전환 */
    channelPage() {
        this.setState({ mode: 1 });
    }

    videoPage() {
        this.setState({ mode: 2 });
    }

    myPage() {
        this.setState({ mode: 3 });
    }

    
    render() {

        const { authData: { isLoggedIn } } = this.props;

        return (
            <View style={styles.container} >

                <View style={styles.viewContainer}>
                    {(this.state.mode === 1) && <Channel />}
                    {(this.state.mode === 2) && <Video />}
                    {(this.state.mode === 3) && <LoginRoutes isLoggedIn={isLoggedIn} />}

                    {/* {(this.state.mode === 4) && <VideoLike />} */}
                </View>

                {/* 화면 이동 버튼 */}
                < View style={styles.buttonAlign} >
                    <TouchableOpacity style={styles.buttonStyle} onPress={this.channelPage.bind(this)}>
                    <Icon name="ios-film" size={30} color="#000000" />
                        <Text style={styles.signUpTextButton}>채널 랭킹</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonStyle} onPress={this.videoPage.bind(this)}>
                    <Icon name="ios-videocam" size={30} color="#000000" />
                        <Text style={styles.signUpTextButton}>영상 랭킹</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonStyle} onPress={this.myPage.bind(this)}>
                    <Icon name="ios-person" size={30} color="#000000" />
                        <Text style={styles.signUpTextButton}>MY</Text>
                    </TouchableOpacity>
                </View >
            </View>

        )
    }
}

mapStateToProps = state => ({
    authData: state.authReducer.authData
});

export default connect(mapStateToProps, null)(MainPage)

/** 스타일 */
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    viewContainer: {
        flex: 10
    },
    buttonAlign: {
        flex:1,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        marginBottom: 15,
        borderTopColor: "black",
        borderTopWidth: 1
    },
    buttonStyle: {
        flex: 1,
        alignItems: "center",
        paddingTop: 15,
        paddingBottom: 15,
    },
    signUpTextButton: {
        color: "#000000",
        fontWeight: "400",
        fontSize:10
    }
});