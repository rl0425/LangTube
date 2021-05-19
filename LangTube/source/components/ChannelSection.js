import React, { Component } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from "react-native";


export default class ChannelSection extends Component {

    /* 생성자 */
    constructor(props) {
        super(props)
        this.state = {
            text: " ",
            image: null,
            commentList: [1, 2, 3, 4]
        }
    }

    /** 코멘트 기능 활성화 */
    onComment(channelImage, channelTitle, channelComment, channelRank, subscriber) {
        this.props.changeComment();
        this.props.addInfo(channelImage, channelTitle, channelComment, channelRank, subscriber);
    }

    render() {
        let channel = this.props.channel;

        return (
            <View style={styles.container}>

                {/* 메달 표시 */}
                <View style={styles.medalContainer}>
                    {(channel.rank === 0) && <Image source={require('../../assets/medal1.png')}
                        style={{ width: 30, height: 30 }} />}
                    {(channel.rank === 1) && <Image source={require('../../assets/medal2.png')}
                        style={{ width: 30, height: 30 }} />}
                    {(channel.rank === 2) && <Image source={require('../../assets/medal3.png')}
                        style={{ width: 30, height: 30 }} />}
                </View>

                <View style={styles.container02}>
                    {/* 채널 썸네일 */}
                    <TouchableOpacity onPress={this.onComment.bind(this, channel.snippet.thumbnails.medium.url, channel.snippet.title, this.state.commentList, channel.rank, channel.statistics.subscriberCount)} >
                        <Image source={{ uri: channel.snippet.thumbnails.medium.url }} style={{ width: 90, height: 90, borderRadius: 20 }} />
                    </TouchableOpacity>

                    {/* 채널 정보 */}
                    <View>
                        <View style={styles.channelDetails}>
                            <Text numberOfLines={2} style={styles.channelTitle}>{channel.snippet.title}</Text>
                            <Text style={styles.channelStats}>{"구독자 수 : " + nFormatter(channel.statistics.subscriberCount, 1)}</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

/** 구독자 수 포멧 함수 */
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
    return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol + ' ';
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
    channelTitle: {
        fontSize: 16,
        color: "#3c3c3c"
    },
    channelDetails: {
        paddingHorizontal: 15,
        flex: 1,
        justifyContent:"center",
    },
    channelStats: {
        fontSize: 15,
        paddingTop: 3,
        color: "grey"
    }
});