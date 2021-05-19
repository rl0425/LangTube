/** 상태변경을 진행하는 파일 */
/** dispatch 함수로 부터 전달받은 action 객체의 type 에 따라 상태를 변경 */

/** 모듈 */
import { combineReducers } from "redux";

/** 인증 수행 시 dispatch 함수로 부터 전달받은 action 객체의 유형의 따라 state를 변경 */
const authData = (state = {}, action) => {
    switch (action.type) {
        case "AUTH_USER_SUCCESS":
            return {
                token: action.token,
                isLoggedIn: true
            }
        case "AUTH_USER_FAIL":
            return {
                token: null,
                isLoggedIn: false
            }
        default:
            return state;
    }
}

/** 회원가입 수행 시 dispatch 함수로 부터 전달받은 action 객체의 유형의 따라 state를 변경 */
const createUser = (state = {}, action) => {
    switch (action.type) {
        case "CREATE_USER_LOADING":
            return {
                isLoading: true,
                isError: false,
                isSuccess: false,
                errors: null
            }
        case "CREATE_USER_SUCCESS":
            return {
                isLoading: false,
                isError: false,
                isSuccess: true,
                errors: null
            }
        case "CREATE_USER_FAIL":
            return {
                isLoading: false,
                isError: true,
                isSuccess: false,
                errors: action.payload
            }
        default:
            return state;
    }
}

/** 로그인 수행 시 dispatch 함수로 부터 전달받은 action 객체의 유형의 따라 state를 변경 */
const loginUser = (state = {}, action) => {
    switch (action.type) {
        case "LOGIN_USER_LOADING":
            return {
                isLoading: true,
                isError: false,
                isSuccess: false,
                errors: null
            }
        case "LOGIN_USER_SUCCESS":
            return {
                isLoading: false,
                isError: false,
                isSuccess: true,
                errors: null
            }
        case "LOGIN_USER_FAIL":
            return {
                isLoading: false,
                isError: true,
                isSuccess: false,
                errors: action.payload
            }
        default:
            return state;
    }
}

export default combineReducers({
    createUser,
    loginUser,
    authData
});