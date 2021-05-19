import React from "react";
import { Router, Scene } from "react-native-router-flux";

/** 컴포넌트 */
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import MyPage from "../pages/MyPage";
import Profile from "../pages/Profile";
import VideoLike from "../pages/VideoLike";
import ChannelLike from "../pages/ChannelLike";
import UseWay from "../pages/UseWay";
import DeveloperInfo from "../pages/DeveloperInfo";

/** 각 페이지간의 화면 이동 */
export default class LoginRoutes extends React.Component {

    render() {
        return (
            <Router>
                <Scene>
                    {/* 로그인, 회원가입 */}
                    <Scene key="root" hideNavBar={true} initial={!this.props.isLoggedIn}>
                        <Scene key="login" component={Login} initial={true} />
                        <Scene key="signup" component={SignUp} />
                        
                    </Scene>
                    {/* 프로필 페이지 */}
                    <Scene key="app" hideNavBar={true} initial={this.props.isLoggedIn}>
                        <Scene key="mypage" component={MyPage} initial={true}/>

                        <Scene key="profile" component={Profile} />
                        <Scene key="useway" component={UseWay} />
                        <Scene key="developerinfo" component={DeveloperInfo} />
                        <Scene key="videolike" component={VideoLike} />
                        <Scene key="channelLike" component={ChannelLike} />
                    </Scene>
                </Scene>
            </Router>
        )
    }
}