import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";

/** 모듈 */
import { Actions } from "react-native-router-flux";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { compose } from "redux";

/** 컴포넌트 */
import Logo from "../components/Logo";
import InputText from "../components/InputText";
import { createUser } from "../actions/auth.actions";
import Loader from "../components/Loader";
import { SignUpError } from "../utils/SignUpError";

/** 회원가입 기능의 전체적인 실행을 담당하는 클래스 */
class SignUp extends React.Component {

    /** 로그인 페이지로 이동 */
    loginPage() {
        Actions.pop();
    }

    /** 회원가입 동작을 서버와 통신 */
    createUser = async (values) => {
        try {
            const response = await this.props.dispatch(createUser(values));
            if (!response.success) {
                throw response;
            }
        }
        /** 오류 메시지 출력 */
        catch (error) {
            const newError = new SignUpError(JSON.stringify(error), "회원가입 오류");
            newError.showAlert();
        }
    }

    onSubmit = (values) => {
        this.createUser(values);
    }

    /** 회원가입 양식에 대한 오류 메시지 출력 */
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
        const { handleSubmit, createUser } = this.props;
        return (
            <View style={styles.container}>
                {/* 로딩화면 */}
                {createUser.isLoading && <Loader />}

                {/* 로고 */}
                <Logo />

                <View style={styles.formContainer}>
                    {/* 회원가입 양식 */}
                    <Field
                        name="name"
                        placeholder=" Name (2글자 이상)"
                        component={this.renderTextInput} />
                    <Field
                        name="email"
                        placeholder=" Email (6글자 이상)"
                        component={this.renderTextInput} />
                    <Field
                        name="password"
                        placeholder=" Password (6글자 이상)"
                        secureTextEntry={true}
                        component={this.renderTextInput} />
                    {/* 가입 버튼 */}
                    <TouchableOpacity style={styles.signUpButton} onPress={handleSubmit(this.onSubmit)}>
                        <Text style={styles.signUpButtonText}>가입</Text>
                    </TouchableOpacity>
                </View>

                {/* 로그인 페이지 전환 버튼 */}
                <View style={styles.loginTextCont}>
                    <Text style={styles.loginText}>계정이 있으신가요?  </Text>
                    <TouchableOpacity onPress={this.loginPage}>
                        <Text style={styles.loginTextButton}>로그인</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

/** 유효성 검사 */
const validate = (values) => {
    const errors = {};
    if (!values.name) {
        errors.name = "이름을 입력해주세요."
    }
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
    createUser: state.authReducer.createUser
});

/** store에 접근한 컴포넌트가 store의 상태를 바꾸기 위해 사용 */
/** connect함수 두번째 인자로 들어감 */
mapDispatchToProps = (dispatch) => ({
    dispatch
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    reduxForm({
        form: "register",
        validate
    })
)(SignUp);

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
    loginText: {
        color: "#6E6E6E"
    },
    loginTextButton: {
        color: "#000000",
        fontWeight: "600"
    },
    signUpButton: {
        backgroundColor: "#000000",
        width: 300,
        borderRadius: 20,
        marginVertical: 25,
        justifyContent: "center",
        height: 40
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
    },
    buttonAlign: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 40,
        height: 60,
        borderTopColor: 'black',
        borderTopWidth: 1.5,
        borderBottomColor: 'black',
        borderBottomWidth: 1.5,
    }
});