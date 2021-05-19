import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

const CommentSection = ({num}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>   {num}</Text>
        </View>
    );
};




const styles = StyleSheet.create({
    container: {
        borderBottomWidth: 0.4,
        height: 40,
        alignItems:"flex-start",
        justifyContent:"center",
        marginLeft: 18,
        marginRight: 18
    },
    text: {
        textAlign: "center",
        textAlignVertical: "center",
        fontSize: 15
    },
});

export default CommentSection;

