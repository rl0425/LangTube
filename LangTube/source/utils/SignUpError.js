import { Alert } from "react-native";

/** 회원가입 시 발생하는 에러 메시지를 하나로 통합 */
export class SignUpError {
    constructor(error, title = "") {
        this.errorTitle = title;
        this.errorText = "다른 이메일 작성 또는 회원가입 양식을 확인해주세요.";

        if (error.message) {
            this.errorText = error.message;
        } else if (error.responseBody && error.responseBody.message) {
            this.errorText = error.responseBody.message;
        } else if (error.responseBody) {
            this.errorText = error.responseBody;
        }
    }

    showAlert() {
        Alert.alert(
            this.errorTitle,
            this.errorText,
            [{ text: "Cancel", onPress: () => console.log("Cancel Pressed"), style: "cancel" }]
        );
    }
}