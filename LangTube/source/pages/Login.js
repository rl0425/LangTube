import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";

/** 모듈 */
import { Actions } from "react-native-router-flux";   // 화면이동을 관리할 수 있게 해주는 모듈
import { connect } from "react-redux";   // Provider 하위에 존재하는 컴포넌트들이 store에 접근하게 해줌  
import { compose } from "redux";   // 전역에서 상태를 관리하고, 필요한 컴포넌트에서 상태를 쓸 수 있게 하는 모듈
import { Field, reduxForm } from "redux-form";

/** 컴포넌트 */
import Logo from "../components/Logo";
import InputText from "../components/InputText";
import Loader from "../components/Loader";
import { loginUser } from "../actions/auth.actions";

/** 로그인 기능의 전체적인 실행을 담당하는 클래스 */
class Login extends React.Component {

    /** 회원가입 페이지로 이동 */
    signUpPage() {
        Actions.signup();
    }

    /** 로그인 동작을 서버와 통신 */
    loginUser = async (values) => {
        try {
            const response = await this.props.dispatch(loginUser(values));
            console.log(response);
            if (!response.success) {
                throw response;
            }
        }
        /** 오류 메시지 출력 */
        catch (error) {
            let errorText;
            if (error.message) {
                errorText = error.message;
            }
            errorText = error.responseBody;
            Alert.alert(
                "이메일 또는 비밀번호를 확인해주세요.",
                errorText,
                [{ text: "Cancel", onPress: () => console.log("Cancel Pressed"), style: "cancel" }]
            );
        }
    }

    onSubmit = (values) => {
        this.loginUser(values);
    }

    /** 로그인 양식에 대한 오류 메시지 출력 */
    renderTextInput = (field) => {
        const { meta: { touched, error }, label, secureTextEntry, maxLength, keyboardType, placeholder, input: { onChange, ...restInput } } = field;
        return (
            <View>
                <InputText
                    onChangeText={onChange}
                    maxLength={maxLength}
                    placeholder={placeholder}
                    keyboardType={keyboardType}
                    secureTextEntry={secureTextEntry}
                    label={label}
                    {...restInput} />
                {(error && touched) && <Text style={styles.errorText}>{error}</Text>}
            </View>
        );
    }

    render() {
        const { handleSubmit, loginUser } = this.props;
        return (
            <View style={styles.container}>
                {/* 로딩화면 */}
                {(loginUser && loginUser.isLoading) && <Loader />}

                {/* 로고 */}
                <Logo />

                <View style={styles.formContainer}>
                    {/* 로그인 양식 */}
                    <Field
                        name="email"
                        placeholder=" Email"
                        component={this.renderTextInput} />
                    <Field
                        name="password"
                        placeholder=" Password"
                        secureTextEntry={true}
                        component={this.renderTextInput} />
                    {/* 로그인 버튼 */}
                    <TouchableOpacity style={styles.signUpButton} onPress={handleSubmit(this.onSubmit)}>
                        <Text style={styles.signUpButtonText}>로그인</Text>
                    </TouchableOpacity>
                </View>

                {/* 회원가입 페이지 전환 버튼 */}
                <View style={styles.signUpTextCont}>
                    <Text style={styles.signUpText}>아직 계정이 없으신가요?  </Text>
                    <TouchableOpacity onPress={this.signUpPage}>
                        <Text style={styles.signUpTextButton}>회원가입</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

/** 유효성 검사 */
const validate = (values) => {
    const errors = {};

    if (!values.email) {
        errors.email = "메일주소를 입력해주세요."
    }
    if (!values.password) {
        errors.password = "비밀번호를 입력해주세요."
    }
    return errors;
};

/** store가 업데이트 될때마다 자동으로 호출 */
/** connect함수 첫번째 인자로 들어감 */
mapStateToProps = (state) => ({
    loginUser: state.authReducer.loginUser
});

/** store에 접근한 컴포넌트가 store의 상태를 바꾸기 위해 사용 */
/** connect함수 두번째 인자로 들어감 */
mapDispatchToProps = (dispatch) => ({
    dispatch
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    reduxForm({
        form: "login",
        validate
    })
)(Login);

/** 스타일 */
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    formContainer: {
        flex: 1.5,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "flex-start",
    },
    loginTextCont: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 15,
        flexDirection: "row"
    },
    signUpTextCont: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 15,
        flexDirection: "row"
    },
    signUpText: {
        color: "#6E6E6E"
    },
    signUpTextButton: {
        color: "#000000",
        fontWeight: "600"
    },
    signUpButton: {
        backgroundColor: "#000000",
        width: 300,
        borderRadius: 20,
        marginVertical: 25,
        justifyContent:"center",
        height:40
    },
    signUpButtonText: {
        color: "#FFFFFF",
        fontSize: 17,
        fontWeight: "500",
        textAlign: "center"
    },
    errorText: {
        color: "#6E6E6E",
        fontSize: 13,
        paddingHorizontal: 5,
        paddingBottom: 3
    }
});