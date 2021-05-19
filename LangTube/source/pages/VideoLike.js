import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Image, TextInput } from "react-native";

/** 모듈 */
import { Actions } from "react-native-router-flux";
import Icon from 'react-native-vector-icons/Ionicons';
import video_like from "../components/like-data/video-like.json"
import VideoLikeSection from "../components/VideoLikeSection";

export default class Video_Like extends React.Component {

    /** 프로필 페이지로 이동 */
    myPage() {
        Actions.pop();
    }

    /** 생성자 */
    constructor(props) {
        super(props)
        this.state = {
            setComment: false,   // 댓글창 전환 설정
            videoImage: null,
            videoTitle: null,
            videoRank: 0,
            videoMode: 0,
            nothing:null
        };
    }

    nothing(){
        this.setState({ nothing:null })
    }

    /** 자식 에서 부모로 데이터 전달 */
    sendInfo(image, title, mode, rank) {
        this.setState({ videoImage: image });   // 썸네일 데이터
        this.setState({ videoTitle: title });  // 제목 데이터
        this.setState({ videoMode: mode })   // 모드 데이터
        this.setState({ videoRank: rank })   // 랭크 데이터
    }


    render() {
        return (
            <View style={styles.container}>

                {/* 뒤로가기 버튼 */}
                <View style={styles.backButtonContainer}>
                    <View style={styles.backButtonStyle}>
                        <TouchableOpacity style={styles.backButtonStyle} onPress={this.myPage}>
                            <Icon name="ios-arrow-back" size={18} color="#000000" />
                            <Text style={styles.buttonTextStyle}>  뒤로 가기</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* 툴바 */}
                <View style={styles.navBarStyle}>
                    <Text style={styles.titleTextStyle}>찜한 영상 목록</Text>
                </View>

                {/* 찜한 목록 표시부분 */}
                <View style={styles.videoContainer}>
                    <FlatList
                        keyExtractor={item => item[2]}
                        data={video_like.items}
                        renderItem={({ item }) => <VideoLikeSection item={item} changeComment={this.nothing.bind(this)} addInfo={this.nothing.bind(this)} />}
                        ItemSeparatorComponent={() => <View style={{ height: 1.2, backgroundColor: "#E5E5E5" }} />}
                    />
                </View>
            </View>
        )
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    videoContainer: {
        flex: 8
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
    titleTextStyle: {
        fontSize: 20,
        fontWeight: "400",
        alignItems: "center",
        justifyContent: "center"
    },
    backButtonContainer: {
        flex: 0.5,
        marginLeft: 15,
        flexDirection: "row",
        marginTop: 70
    },
    blankContainer: {
        flex: 0.95
    },
    backButtonStyle: {
        flexDirection: "row",
        borderBottomColor: "black"
    },
    buttonTextStyle: {
        fontSize: 16
    },
    commentContainer: {
        flex: 3.5
    },
    commentAddStyle: {
        flexDirection: "row",
        paddingLeft: 10,
        paddingTop: 10
    },
    infoContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderBottomColor: "black",
        borderBottomWidth: 1,
        borderTopColor: "black",
        borderTopWidth: 1,
        paddingLeft: 10
    },
});