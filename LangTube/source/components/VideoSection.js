import React, { Component } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

export default class VideoSection extends Component {

    /** 생성자 */
    constructor(props) {
        super(props)
        this.state = {
            text: " ",
            image: null,
            commentList: [1, 2, 3, 4]
        }
    }

    /** 코멘트 기능 활성화 */
    onComment(videoImage, videoTitle, videoComment, videoRank, counter, month, id) {
        this.props.changeComment();
        this.props.addInfo(videoImage, videoTitle, videoComment, videoRank, counter, month, id);
    }

    render() {
        let video = this.props.video;

        return (
            <View style={styles.container}>

                {/* 메달 표시 */}
                <View style={styles.medalContainer}>
                    {(video.rank === 0) && <Image source={require("../../assets/medal1.png")}
                        style={{ width: 30, height: 30 }} />}
                    {(video.rank === 1) && <Image source={require("../../assets/medal2.png")}
                        style={{ width: 30, height: 30 }} />}
                    {(video.rank === 2) && <Image source={require("../../assets/medal3.png")}
                        style={{ width: 30, height: 30 }} />}
                </View>

                <View style={styles.container02}>
                    {/* 영상 썸네일 */}
                    <TouchableOpacity onPress={this.onComment.bind(this, video.snippet.thumbnails.medium.url, video.snippet.title, this.state.commentList, video.rank, video.statistics.viewCount, video.snippet.publishedAt, video.id)}>
                        <Image source={{ uri: video.snippet.thumbnails.medium.url }} style={{ width: 90, height: 90, borderRadius: 20 }} />
                    </TouchableOpacity>


                    {/* 영상 정보 */}
                    <View>
                        <View style={styles.videoDetails}>
                            <Text numberOfLines={1} style={styles.videoTitle}>{video.snippet.title}</Text>
                            <Text style={styles.videoStats}>{"조회수 : " + nFormatter(video.statistics.viewCount, 1)}</Text>
                        </View>
                    </View>
                </View>

            </View>
        )
    }
}
function nFormatter(num, digits) {
    var si = [
        { value: 1, symbol: "" },
        { value: 1E3, symbol: "k" },
        { value: 1E6, symbol: "M" },
        { value: 1E9, symbol: "G" },
        { value: 1E12, symbol: "T" },
        { value: 1E15, symbol: "P" },
        { value: 1E18, symbol: "E" }
    ];

    var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var i;
    for (i = si.length - 1; i > 0; i--) {
        if (num >= si[i].value) {
            break;
        }
    }
    return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol + ' views';
}
const styles = StyleSheet.create({
    container: {
        padding: 15,
        flexDirection: "row"
    },
    container02: {
        flex: 10,
        flexDirection: "row",
        marginLeft: 7
    },
    medalContainer: {
        flex: 1,
        borderRightWidth: 1,
        borderRightColor: "#E5E5E5",
        justifyContent: "center",
        height: 90
    },
    videoTitle: {
        fontSize: 16,
        color: "#3c3c3c"
    },
    videoDetails: {
        paddingHorizontal: 15,
        flex: 1,
        justifyContent:"center",
    },
    videoStats: {
        fontSize: 15,
        paddingTop: 3,
        color: "grey"
    }
});