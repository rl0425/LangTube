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

    render() {
        let item = this.props.item;

        return (
            <View style={styles.container}>

                {/* 채널 썸네일 */}
                <Image source={{ uri: item[0] }} style={{ width: 90, height: 90, borderRadius: 20 }} />

                {/* 채널 정보 */}
                <View>
                    <View style={styles.channelDetails}>
                        <Text numberOfLines={2} style={styles.channelTitle}>{item[1]}</Text>
                        <Text style={styles.channelStats}>{"구독자 수 : " + nFormatter(item[2], 1)}</Text>
                        {item[3] === 0 && <Text style={styles.channelStats}>카테고리 : 음악</Text>}
                        {item[3] === 1 && <Text style={styles.channelStats}>카테고리 : 디지털</Text>}
                        {item[3] === 2 && <Text style={styles.channelStats}>카테고리 : 스포츠</Text>}
                        {item[3] === 3 && <Text style={styles.channelStats}>카테고리 : 유아</Text>}
                        {item[3] === 4 && <Text style={styles.channelStats}>카테고리 : 먹방</Text>}
                        {item[3] === 5 && <Text style={styles.channelStats}>카테고리 : 유머</Text>}
                        {item[3] === 6 && <Text style={styles.channelStats}>카테고리 : 게임</Text>}
                        {item[3] === 7 && <Text style={styles.channelStats}>카테고리 : 영화</Text>}
                        {item[3] === 8 && <Text style={styles.channelStats}>카테고리 : 동물</Text>}
                        {item[3] === 9 && <Text style={styles.channelStats}>카테고리 : 여행</Text>}
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
        justifyContent: "center"
    },
    channelStats: {
        fontSize: 15,
        paddingTop: 3,
        color: "grey"
    }
});