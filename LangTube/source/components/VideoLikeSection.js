import React, { Component } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

export default class VideoLikeSection extends Component {

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
                <Image source={{ uri: item[1] }} style={{ width: 90, height: 90, borderRadius: 20 }} />


                {/* 영상 정보 */}
                <View>
                    <View style={styles.videoDetails}>
                        <Text numberOfLines={1} style={styles.videoTitle}>{item[2]}</Text>
                        <Text style={styles.videoStats}>{"조회수 : " + nFormatter(item[5], 1)}</Text>
                        {item[3] === 1 && <Text style={styles.videoStats}>카테고리 : 음악</Text>}
                        {item[3] === 0 && <Text style={styles.videoStats}>카테고리 : 디지털</Text>}
                        {item[3] === 2 && <Text style={styles.videoStats}>카테고리 : 스포츠</Text>}
                        {item[3] === 3 && <Text style={styles.videoStats}>카테고리 : 유아</Text>}
                        {item[3] === 4 && <Text style={styles.videoStats}>카테고리 : 먹방</Text>}
                        {item[3] === 5 && <Text style={styles.videoStats}>카테고리 : 유머</Text>}
                        {item[3] === 6 && <Text style={styles.videoStats}>카테고리 : 게임</Text>}
                        {item[3] === 7 && <Text style={styles.videoStats}>카테고리 : 영화</Text>}
                        {item[3] === 8 && <Text style={styles.videoStats}>카테고리 : 동물</Text>}
                        {item[3] === 9 && <Text style={styles.videoStats}>카테고리 : 여행</Text>}
                        <Text style={styles.videoStats}>{"제공일 : " + item[6]}</Text>
                    </View>
                </View>
            </View>
        );
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
    descContainer: {
        paddingTop: 15
    },
    videoTitle: {
        fontSize: 16,
        color: "#3c3c3c"
    },
    videoDetails: {
        paddingHorizontal: 15,
        flex: 1,
        justifyContent: "center"
    },
    videoStats: {
        fontSize: 15,
        paddingTop: 3,
        color: "grey"
    }
});


