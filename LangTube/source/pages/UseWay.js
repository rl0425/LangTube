import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";

/** 모듈 */
import { Actions } from "react-native-router-flux";
import Icon from "react-native-vector-icons/Ionicons";


class UseWay extends React.Component {

    /** 생성자 */
    constructor(props) {
        super(props)
        this.state = {
            mode: 1
        };
    }

    /** 프로필 페이지로 이동 */
    myPage() {
        Actions.pop();
    }

    /** 화면 오른쪽으로 이동 */
    pagePlus() {
        this.setState({ mode: ++this.state.mode });
    }

    /** 화면 왼쪽으로 이동 */
    pageMinus() {
        this.setState({ mode: --this.state.mode });
    }

    render() {

        var imageSource01 = "../../assets/useway1.png";   // 회원가입 이미지
        var imageSource02 = "../../assets/useway2.png";   // 로그인 이미지
        var imageSource03 = "../../assets/useway3.jpg";   // 로그아웃
        var imageSource04 = "../../assets/useway4.jpg";   // 프로필 정보
        var imageSource05 = "../../assets/useway5.jpg";   // 시스템 사용법
        var imageSource06 = "../../assets/useway6.jpg";   // 개발자 정보
        var imageSource07 = "../../assets/useway7.jpg";   // 채널 랭킹 확인
        var imageSource08 = "../../assets/useway8.jpg";   // 영상 랭킹 확인
        var imageSource09 = "../../assets/useway9.jpg";   // 영상 바로가기 링크
        var imageSource10 = "../../assets/useway10.jpg";   // 찜하기
        var imageSource11 = "../../assets/useway11.jpg";   // 댓글 작성
        var imageSource12 = "../../assets/useway12.jpg";   // 찜목록


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
                    <Text style={styles.titleTextStyle}>시스템 사용법</Text>
                </View >

                {/* 빈공간 */}
                <View style={styles.blankContainer01} />

                {/* 사용법 이미지 */}
                <View style={styles.imageArea}>
                    {(this.state.mode === 1) && <Image source={require(imageSource01)}
                        style={{ width: 220, height: 475, borderWidth: 0.2, borderRadius: 15 }} />}
                    {(this.state.mode === 2) && <Image source={require(imageSource02)}
                        style={{ width: 220, height: 475, borderWidth: 0.2, borderRadius: 15 }} />}
                    {(this.state.mode === 3) && <Image source={require(imageSource03)}
                        style={{ width: 220, height: 475, borderWidth: 0.2, borderRadius: 15 }} />}
                    {(this.state.mode === 4) && <Image source={require(imageSource04)}
                        style={{ width: 220, height: 475, borderWidth: 0.2, borderRadius: 15 }} />}
                    {(this.state.mode === 5) && <Image source={require(imageSource05)}
                        style={{ width: 220, height: 475, borderWidth: 0.2, borderRadius: 15 }} />}
                    {(this.state.mode === 6) && <Image source={require(imageSource06)}
                        style={{ width: 220, height: 475, borderWidth: 0.2, borderRadius: 15 }} />}
                    {(this.state.mode === 7) && <Image source={require(imageSource07)}
                        style={{ width: 220, height: 475, borderWidth: 0.2, borderRadius: 15 }} />}
                    {(this.state.mode === 8) && <Image source={require(imageSource08)}
                        style={{ width: 220, height: 475, borderWidth: 0.2, borderRadius: 15 }} />}
                    {(this.state.mode === 9) && <Image source={require(imageSource09)}
                        style={{ width: 220, height: 475, borderWidth: 0.2, borderRadius: 15 }} />}
                    {(this.state.mode === 10) && <Image source={require(imageSource10)}
                        style={{ width: 220, height: 475, borderWidth: 0.2, borderRadius: 15 }} />}
                    {(this.state.mode === 11) && <Image source={require(imageSource11)}
                        style={{ width: 220, height: 475, borderWidth: 0.2, borderRadius: 15 }} />}
                    {(this.state.mode === 12) && <Image source={require(imageSource12)}
                        style={{ width: 220, height: 475, borderWidth: 0.2, borderRadius: 15 }} />}

                </View>

                {/* 사용법 이동 버튼 */}
                <View style={styles.buttonAlign}>
                    {/* "<" 버튼 */}
                    {this.state.mode === 1 ?
                        <TouchableOpacity style={styles.buttonArea} disabled={true}>
                            <Text style={styles.useWayButtonText}>&lt;</Text>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity style={styles.buttonArea} onPress={this.pageMinus.bind(this)}>
                            <Text style={styles.useWayButtonText}>&lt;</Text>
                        </TouchableOpacity>}

                    <View style={styles.titleArea}>
                        {(this.state.mode === 1) && <Text style={styles.textStyle}>회원가입 기능</Text>}
                        {(this.state.mode === 2) && <Text style={styles.textStyle}>로그인 기능</Text>}
                        {(this.state.mode === 3) && <Text style={styles.textStyle}>로그아웃 기능</Text>}
                        {(this.state.mode === 4) && <Text style={styles.textStyle}>프로필 정보 확인</Text>}
                        {(this.state.mode === 5) && <Text style={styles.textStyle}>시스템 사용법 확인</Text>}
                        {(this.state.mode === 6) && <Text style={styles.textStyle}>개발자 정보 확인</Text>}
                        {(this.state.mode === 7) && <Text style={styles.textStyle}>채널 랭킹 확인</Text>}
                        {(this.state.mode === 8) && <Text style={styles.textStyle}>영상 랭킹 확인</Text>}
                        {(this.state.mode === 9) && <Text style={styles.textStyle}>영상 바로가기 링크</Text>}
                        {(this.state.mode === 10) && <Text style={styles.textStyle}>찜하기 기능</Text>}
                        {(this.state.mode === 11) && <Text style={styles.textStyle}>댓글 작성 기능</Text>}
                        {(this.state.mode === 12) && <Text style={styles.textStyle}>찜목록 확인</Text>}
                    </View>
                    {/* ">" 버튼 */}
                    {this.state.mode === 12 ?
                        <TouchableOpacity style={styles.buttonArea} disabled={true}>
                            <Text style={styles.useWayButtonText}>&gt;</Text>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity style={styles.buttonArea} onPress={this.pagePlus.bind(this)}>
                            <Text style={styles.useWayButtonText}>&gt;</Text>
                        </TouchableOpacity>}

                </View>
            </View>

        )
    }
}

export default UseWay;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    backButtonContainer: {
        flex: 0.5,
        flexDirection: "row",
        marginLeft: 15,
        marginTop: 70
    },
    navBarStyle: {
        flex: 0.5,
        alignItems: "center",
        justifyContent: "center",
        borderColor: "#F2F2F2",
        borderWidth: 1,
        backgroundColor: "#F2F2F2",
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 20
    },
    titleTextStyle: {
        fontSize: 20,
        fontWeight: "400",
        alignItems: "center",
        justifyContent: "center"
    },
    backButtonStyle: {
        flexDirection: "row",
        borderBottomColor: "black"
    },
    buttonTextStyle: {
        fontSize: 16
    },
    imageArea: {
        flexDirection: "row",
        flex: 6,
        justifyContent: "center",
        alignItems: "center"
    },
    blankContainer01: {
        flex: 0.5
    },
    titleArea: {
        flex: 2,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonArea: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    textStyle: {
        color: "#000000",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 20
    },
    buttonAlign: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        marginBottom: 15,
        paddingBottom: 15,
        height: 40,
    },
    useWayButtonText: {
        color: "#000000",
        fontSize: 25,
        fontWeight: "400"
    },
});