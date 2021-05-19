import PropTypes from "prop-types";
import React from "react";
import { TextInput, View, StyleSheet } from "react-native";

const propTypes = {
    mapElement: PropTypes.func,
    onSubmitEditing: PropTypes.func,
    onChangeText: PropTypes.func,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    maxLength: PropTypes.number,
    keyboardType: PropTypes.string,
    secureTextEntry: PropTypes.bool,
    label: PropTypes.string
};

const defaultProps = {
    mapElement: (n) => { },
    onSubmitEditing: () => { },
    onChangeText: () => { },
    value: "",
    placeholder: "",
    maxLength: 200,
    keyboardType: "default",
    secureTextEntry: false,
    label: ""
};

const styles = StyleSheet.create({
    inputBox: {
        width: 300,
        //borderLeftWidth: 1,
        //borderRightWidth: 1,
        borderBottomWidth: 1,
        //borderTopWidth: 1,
        fontSize: 15,
        marginVertical: 9,
        paddingVertical: 9,
        //borderRadius: 20
    }

});

class InputText extends React.Component {

    state = {
        value: ""
    }

    componentDidMount() {
        this.setState({
            value: this.props.value
        });
    }

    onChangeText = (value) => {
        this.setState({
            value
        }, () => {
            this.props.onChangeText(value);
        })
    }

    render() {
        const { placeholder, secureTextEntry, keyboardType, maxLength, value, onChangeText, onSubmitEditing } = this.props;
        return (
            <View>
                <TextInput
                    style={styles.inputBox}
                    placeholder={placeholder}
                    selectionColor="#000000"
                    secureTextEntry={secureTextEntry}
                    keyboardType={keyboardType}
                    maxLength={maxLength}
                    returnKeyType="next"
                    value={this.state.value}
                    onSubmitEditing={onSubmitEditing}
                    onChangeText={this.onChangeText} />
            </View>
        );
    }
}

InputText.defaultProps = defaultProps;

InputText.propTypes = propTypes;

export default InputText;