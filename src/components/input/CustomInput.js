import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { COLOR_CODES } from 'App/src/utility/Theme';

export default function CustomInput(props) {
    const { _handleBlur, _handleFocus, _onContentSizeChange, isFocussed, _onChangeText, height, _value, _placeholder, _multiline } = props;
    return (
        <TextInput
            style={[styles.input, { height: height }, isFocussed ? { borderColor: COLOR_CODES.BLUE } : { borderColor: COLOR_CODES.LIGHT_GRAY }]}
            selectionColor={COLOR_CODES.GRAY_SHADE}
            multiline={_multiline}
            value={_value}
            placeholder={_placeholder}
            onChangeText={(text) => _onChangeText(text)}
            onContentSizeChange={(event) => _onContentSizeChange(event)}
            onBlur={() => _handleBlur()}
            onFocus={() => _handleFocus()}
        />
    )
}

const styles = StyleSheet.create({
    input: {
        margin: 20,
        borderWidth: 1,
        borderRadius: 5
    },
})