import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Image, TextInput, Alert } from "react-native";

/** 모듈 */
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from "react-redux";
import ToolBarLogo from "../components/ToolBarLogo";

/** 컴포넌트 */
import data01 from "../components/channel-data/data01.json";
import data02 from "../components/channel-data/data02.json";
import data03 from "../components/channel-data/data03.json";
import data04 from "../components/channel-data/data04.json";
import data05 from "../components/channel-data/data05.json";
import data06 from "../components/channel-data/data06.json";
import data07 from "../components/channel-data/data07.json";
import data08 from "../components/channel-data/data08.json";
import data09 from "../components/channel-data/data09.json";
import data10 from "../components/channel-data/data10.json";

import ChannelSection from "../components/ChannelSection";
import CommentSection from "../components/CommentSection";

import comment from "../components/comment-data/channel-comment-store.json"
import channel_like from "../components/like-data/channel-like.json"
import count_like from "../components/like-data/like-count.json"

/** 댓글 임시 저장소 */
const data = comment.data

class Channel extends React.Component {

    /** 생성자 */
    constructor(props) {
        super(props)
        this.state = {
            data01: data01.items,
            data02: data02.items,
            data03: data03.items,
            data04: data04.items,
            data05: data05.items,
            data06: data06.items,
            data07: data07.items,
            data08: data08.items,
            data09: data09.items,
            data10: data10.items,

            mode: 1,   // 카테고리 설정

            setComment: false,   // 댓글창 전환 설정

            channelImage: null,
            channelTitle: null,
            channelComment: null,
            channelRank: 0,

            commentText: ["댓글창"],
            subscriber: 0,

            setLike: false,   //찜하기 설정
        };
        this.inputText = "";
        this.tmpComment = [];
        this.likeNum = 0;   //찜한 갯수
    }

    /** 카테고리별 화면전환 */
    musicCategory() {
        this.setState({ mode: 1 });
    }
    techCategory() {
        this.setState({ mode: 2 });
    }
    sportsCategory() {
        this.setState({ mode: 3 });
    }
    kidCategory() {
        this.setState({ mode: 4 });
    }
    eatCategory() {
        this.setState({ mode: 5 });
    }
    comedyCategory() {
        this.setState({ mode: 6 });
    }
    gameCategory() {
        this.setState({ mode: 7 });
    }
    movieCategory() {
        this.setState({ mode: 8 });
    }
    animalCategory() {
        this.setState({ mode: 9 });
    }
    travelCategory() {
        this.setState({ mode: 10 });
    }

    /** 댓글창 전환 메소드 */
    onComment() {
        this.setState({ setComment: true })
    }

    /** 댓글창 비전환 메소드 */
    offComment() {
        this.setState({ setComment: false })
    }

    /** 댓글 등록 메소드 */
    addComment(i, j, string) {
        this.tmpComment.push(string + " : " + this.inputText)
        this.setState({ commentText: this.tmpComment })
    }

    changeText = (value) => {
        this.inputText = value;
    }

    /** 자식 에서 부모로 데이터 전달 */
    sendInfo(image, title, comment, rank, channelsubscriber) {
        this.setState({ channelImage: image });   // 썸네일 데이터
        this.setState({ channelTitle: title });  // 제목 데이터
        this.setState({ channelComment: comment });   // 댓글 데이터
        this.setState({ channelRank: rank })   // 랭크 데이터
        this.setState({ subscriber: channelsubscriber })   //구독자 데이터
        this.setState({ setLike: data[this.state.mode - 1][rank].heart })   // 찜목록 표시
        this.tmpComment = data[this.state.mode - 1][rank].comments

    }

    /** 찜하기 엑션 */
    likeRegister() {
        /** 찜하기 활성화 */
        if (this.state.setLike === false) {
            this.setState({ setLike: true })
            data[this.state.mode - 1][this.state.channelRank].heart = true
            channel_like.items.push([this.state.channelImage, this.state.channelTitle, this.state.subscriber, this.state.mode - 1, this.state.channelRank])
            data[this.state.mode - 1][this.state.channelRank].likepoint = count_like.channel_count
            count_like.channel_count = count_like.channel_count + 1
        }
        /** 찜하기 비화설화 */
        else {
            this.setState({ setLike: false })
            data[this.state.mode - 1][this.state.channelRank].heart = false
            channel_like.items = channel_like.items.slice(0, data[this.state.mode - 1][this.state.channelRank].likepoint).concat(channel_like.items.slice(data[this.state.mode - 1][this.state.channelRank].likepoint + 1, channel_like.items.length))
            for (let i = data[this.state.mode - 1][this.state.channelRank].likepoint; i < channel_like.items.length; i++) {
                data[channel_like.items[i][3]][channel_like.items[i][4]].likepoint -= 1
            }
            data[this.state.mode - 1][this.state.channelRank].likepoint = -1
            count_like.channel_count -= 1
        }
    }

    render() {

        /** 로그인 확인 메세지 */
        const loginMessage01 = () =>
            Alert.alert(
                "", "댓글 작성을 위해서는 로그인이 필요합니다.",
                [{ text: "OK" }],
                { cancelable: false });

        const loginMessage02 = () =>
            Alert.alert(
                "", "찜하기 기능을 위해서는 로그인이 필요합니다.",
                [{ text: "OK" }],
                { cancelable: false });

        const { getUser: { userDetails } } = this.props;   // 유저 정보

        const { authData: { isLoggedIn } } = this.props;   // 유저의 로그인 상태


        {/* 선택한 카테고리에 맞는 채널 출력 */ }
        var dataNumber = null;

        if (this.state.mode === 1) {
            dataNumber = this.state.data01;
        } else if (this.state.mode === 2) {
            dataNumber = this.state.data02;
        } else if (this.state.mode === 3) {
            dataNumber = this.state.data03;
        } else if (this.state.mode === 4) {
            dataNumber = this.state.data04;
        } else if (this.state.mode === 5) {
            dataNumber = this.state.data05;
        } else if (this.state.mode === 6) {
            dataNumber = this.state.data06;
        } else if (this.state.mode === 7) {
            dataNumber = this.state.data07;
        } else if (this.state.mode === 8) {
            dataNumber = this.state.data08;
        } else if (this.state.mode === 9) {
            dataNumber = this.state.data09;
        } else if (this.state.mode === 10) {
            dataNumber = this.state.data10;
        }
        return (
            <View style={styles.container}>
                {/* setComment에따라 화면전환 */}
                {this.state.setComment === false ?

                    /** 영상 랭킹 부분 */
                    <View style={styles.container}>

                        {/* 툴바 */}
                        <View style={styles.navBarStyle}>
                            <ToolBarLogo />
                            <Text style={styles.titleTextStyle}>채널 랭킹</Text>
                            <View style={styles.container} />
                        </View>


                        {/* 카테고리 설정 버튼 */}
                        <View style={styles.categoryContainer} >
                            <View style={styles.categoryStyle01}>
                                <TouchableOpacity style={styles.categoryButtonStyle} onPress={this.musicCategory.bind(this)}>
                                    <Text style={styles.signUpTextButton}>음악</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.categoryButtonStyle} onPress={this.techCategory.bind(this)}>
                                    <Text style={styles.signUpTextButton}>디지털</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.categoryButtonStyle} onPress={this.sportsCategory.bind(this)}>
                                    <Text style={styles.signUpTextButton}>스포츠</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.categoryButtonStyle} onPress={this.kidCategory.bind(this)}>
                                    <Text style={styles.signUpTextButton}>유아</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.categoryButtonStyle} onPress={this.eatCategory.bind(this)}>
                                    <Text style={styles.signUpTextButton}>먹방</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.categoryStyle02}>
                                <TouchableOpacity style={styles.categoryButtonStyle} onPress={this.comedyCategory.bind(this)}>
                                    <Text style={styles.signUpTextButton}>유머</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.categoryButtonStyle} onPress={this.gameCategory.bind(this)}>
                                    <Text style={styles.signUpTextButton}>게임</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.categoryButtonStyle} onPress={this.movieCategory.bind(this)}>
                                    <Text style={styles.signUpTextButton}>영화</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.categoryButtonStyle} onPress={this.animalCategory.bind(this)}>
                                    <Text style={styles.signUpTextButton}>동물</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.categoryButtonStyle} onPress={this.travelCategory.bind(this)}>
                                    <Text style={styles.signUpTextButton}>여행</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* 선택한 카테고리에 대한 채널 출력 */}
                        <View style={styles.channelContainer}>
                            <FlatList
                                data={dataNumber}
                                renderItem={(channel) => <ChannelSection channel={channel.item} changeComment={this.onComment.bind(this)} addInfo={this.sendInfo.bind(this)} />}
                                keyExtractor={(item) => item.id}
                                ItemSeparatorComponent={() => <View style={{ height: 1.2, backgroundColor: "#E5E5E5" }} />}
                            />
                        </View>
                    </View>
                    :
                    /** 코멘트 부분 */
                    <View style={styles.container}>

                        {/* 뒤로가기 버튼 */}
                        <View style={styles.backButtonContainer}>
                            <View style={styles.blankContainer} />
                            <TouchableOpacity style={styles.backButtonStyle} onPress={this.offComment.bind(this)}>
                                <Icon name="ios-arrow-back" size={18} color="#000000" />
                                <Text style={styles.buttonTextStyle}>  뒤로 가기</Text>
                            </TouchableOpacity>
                        </View>

                        {/* 영상 정보 */}
                        <View style={styles.infoContainer}>

                            <Image source={{ uri: this.state.channelImage }} style={{ width: 115, height: 115, borderRadius: 20 }} flex={3} />

                            <View flex={7}>
                                {/* 영상 상세 정보 */}
                                <View style={styles.detailInfo}>
                                    <Text numberOfLines={1}>채널 제목 : {this.state.channelTitle}</Text>
                                    <Text />
                                    <Text style={{ color: "#585858" }}>구독자수 : {nFormatter(this.state.subscriber, 1)}</Text>
                                    <Text />
                                    {this.state.mode === 1 && <Text style={{ color: "#585858" }}>카테고리 : 음악</Text>}
                                    {this.state.mode === 2 && <Text style={{ color: "#585858" }}>카테고리 : 디지털</Text>}
                                    {this.state.mode === 3 && <Text style={{ color: "#585858" }}>카테고리 : 스포츠</Text>}
                                    {this.state.mode === 4 && <Text style={{ color: "#585858" }}>카테고리 : 유아</Text>}
                                    {this.state.mode === 5 && <Text style={{ color: "#585858" }}>카테고리 : 먹방</Text>}
                                    {this.state.mode === 6 && <Text style={{ color: "#585858" }}>카테고리 : 유머</Text>}
                                    {this.state.mode === 7 && <Text style={{ color: "#585858" }}>카테고리 : 게임</Text>}
                                    {this.state.mode === 8 && <Text style={{ color: "#585858" }}>카테고리 : 영화</Text>}
                                    {this.state.mode === 9 && <Text style={{ color: "#585858" }}>카테고리 : 동물</Text>}
                                    {this.state.mode === 10 && <Text style={{ color: "#585858" }}>카테고리 : 여행</Text>}
                                </View>
                            </View>
                        </View>


                        {/* 찜하기 버튼 */}
                        {this.state.setLike === false ?
                            <TouchableOpacity
                                style={styles.likeButtonContainer}
                                onPress={isLoggedIn === true ? this.likeRegister.bind(this) : loginMessage02}>
                                <Text style={{ color: "white", fontSize: 16 }}>찜목록 추가 ♥</Text>
                            </TouchableOpacity> :
                            <TouchableOpacity
                                style={styles.likeButtonContainer}
                                onPress={this.likeRegister.bind(this)}>
                                <Text style={{ color: "white", fontSize: 16 }}>찜목록 해제</Text>
                            </TouchableOpacity>
                        }



                        {/* 댓글 부분 */}
                        <View style={styles.commentContainer}>
                            {/* 댓글 작성 */}
                            <View style={styles.commentAddStyle}>
                                <TextInput
                                    placeholder="댓글을 입력해주세요."
                                    style={styles.TextInputStyle}
                                    onChangeText={this.changeText}
                                    onSubmitEditing={isLoggedIn === true ? this.addComment.bind(this, this.state.mode - 1, this.state.channelRank, userDetails ? userDetails.name : "") : loginMessage01}>
                                </TextInput>
                                <TouchableOpacity style={styles.signUpButton} onPress={isLoggedIn === true ? this.addComment.bind(this, this.state.mode - 1, this.state.channelRank, userDetails ? userDetails.name : "") : loginMessage01}>
                                    <Icon name="ios-checkmark" size={55} color="#000000" />
                                </TouchableOpacity>
                            </View>

                            {/* 작성된 댓글 모음 */}
                            <View style={
                                {
                                    flex: 1,
                                    borderWidth: 0.5,
                                    borderRadius: 20,
                                    marginLeft: 7,
                                    marginRight: 7,
                                    marginTop: 7,
                                    marginBottom: 14,
                                    backgroundColor: "#FAFAFA",
                                    borderColor: "#D8D8D8",
                                    borderWidth: 1
                                }}>
                                <View style={
                                    {
                                        flex: 0.1,
                                        borderBottomWidth: 0.5,
                                        marginLeft: 7,
                                        marginRight: 7,
                                        marginTop: 10,
                                        backgroundColor: "#FAFAFA",
                                        borderBottomColor: "#D8D8D8",
                                        borderBottomWidth: 1,
                                        justifyContent: "center",
                                        alignItems: "center"
                                    }}>
                                    <Icon name="ios-chatbubbles" size={25} color="#000000" />
                                </View>
                                <View style={{
                                    flex: 0.9
                                }}>
                                    <FlatList
                                        keyExtractor={item => item.id}
                                        data={data[this.state.mode - 1][this.state.channelRank].comments}
                                        renderItem={({ item }) => <CommentSection num={item} />}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                }
            </View>
        )
    }
}

/** store가 업데이트 될때마다 자동으로 호출 */
/** connect함수 첫번째 인자로 들어감 */
mapStateToProps = (state) => ({
    getUser: state.userReducer.getUser,
    authData: state.authReducer.authData
});

/** store에 접근한 컴포넌트가 store의 상태를 바꾸기 위해 사용 */
/** connect함수 두번째 인자로 들어감 */
mapDispatchToProps = (dispatch) => ({
    dispatch
});

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

export default connect(mapStateToProps, mapDispatchToProps)(Channel);

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    backButtonContainer: {
        flex: 0.5,
        marginLeft: 15
    },
    blankContainer: {
        flex: 0.95
    },
    channelContainer: {
        flex: 2
    },
    backButtonStyle: {
        flexDirection: "row",
        borderBottomColor: "black",
        marginBottom: 3
    },
    buttonTextStyle: {
        fontSize: 16
    },
    likeButtonContainer: {
        alignItems: "center",
        paddingTop: 15,
        paddingBottom: 15,
        borderWidth: 0.5,
        borderRadius: 20,
        marginLeft: 7,
        marginRight: 7,
        marginTop: 7,
        marginBottom: 7,
        alignItems: "center",
        backgroundColor: "#FBB5D4",
        borderColor: "#FBB5D4",
        alignItems: "center"
    },
    infoContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "#D8D8D8",
        paddingLeft: 10,
        backgroundColor: "#F2F2F2",
        borderRadius: 20,
        marginLeft: 7,
        marginRight: 7,
        marginTop: 7,
        marginBottom: 7
    },
    commentContainer: {
        flex: 3.5
    },
    commentAddStyle: {
        flexDirection: "row",
        paddingLeft: 10,
        paddingTop: 10,
        borderWidth: 0.5,
        borderRadius: 20,
        marginLeft: 7,
        marginRight: 7,
        marginTop: 7,
        marginBottom: 7,
        backgroundColor: "#F2F2F2",
        borderColor: "#D8D8D8",
        borderWidth: 1
    },
    navBarStyle: {
        flexDirection: "row",
        top: 50,
        height: 50,
        backgroundColor: "white",
        paddingHorizontal: 15,
        alignItems: "center",
        justifyContent: "center"
    },
    titleTextStyle: {
        fontSize: 20,
        fontWeight: "400",
        alignItems: "center",
        justifyContent: "center"
    },
    detailInfo: {
        paddingLeft: 10,
        alignContent: "center"
    },
    categoryContainer: {
        flex: 0.5,
        justifyContent: "flex-end",
        alignItems: "flex-end",
    },
    buttonAlign: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        marginTop: 10,
        marginBottom: 40,
        height: 60,
        borderTopColor: "black",
        borderTopWidth: 1.2,
        borderBottomColor: "black",
        borderBottomWidth: 1.2,
    },
    categoryStyle01: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: 48,
        backgroundColor: "#F2F2F2",
        borderBottomColor: "#FFFFFF",
        borderBottomWidth: 1
    },
    categoryStyle02: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: 48,
        backgroundColor: "#F2F2F2"
    },
    categoryButtonStyle: {
        flex: 1,
        alignItems: "center",
        paddingTop: 15,
        paddingBottom: 15,
        borderRightColor: "#FFFFFF",
        borderRightWidth: 0.4,
        borderLeftColor: "#FFFFFF",
        borderLeftWidth: 0.4
    },
    signUpTextButton: {
        color: "#000000",
        fontWeight: "400"
    },
    TextInputStyle: {
        flex: 1,
        borderBottomColor: "black",
        borderBottomWidth: 0.8,
        height: 40,
        width: 350,
        marginRight: 10,
        paddingLeft: 5,
        backgroundColor: "#F2F2F2"
    },
    signUpButton: {
        width: 50,
        borderRadius: 4
    },
    buttontext: {
        textAlign: "center",
        textAlignVertical: "center",
    },
    channelStats: {
        fontSize: 15,
        paddingTop: 3,
        color: "grey"
    }
});