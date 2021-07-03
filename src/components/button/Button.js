import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { COLOR_CODES } from 'App/src/utility/Theme';

export default function Button(props) {
    const { _onPress, title, extraStyle } = props;
    return (
        <TouchableOpacity onPress={() => _onPress()}>
            <LinearGradient colors={[COLOR_CODES.MELON, COLOR_CODES.BITTERSWEET]}
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={[styles.linearGradient, extraStyle]}
            >
                <Text style={styles.submitButtonText}>{title}</Text>
            </LinearGradient>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    linearGradient: {
        borderRadius: 5,
        margin: 20,
        alignItems: 'center',
    },
    submitButtonText: {
        fontSize: 20,
        color: COLOR_CODES.WHITE
    },
})