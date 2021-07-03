import { Alert } from 'react-native';

export const showAlert = (title, message, buttons, cancelable) => {
    return setTimeout(() => {
        Alert.alert(
            title,
            message,
            buttons,
            { cancelable: cancelable ? cancelable : false }
        )
    }, 200);
}

export function search(nameKey, myArray) {
    for (let i = 0; i < myArray.length; i++) {
        if (myArray[i].name === nameKey) {
            return myArray[i];
        }
    }
}