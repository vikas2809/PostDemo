import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  Modal,
} from 'react-native';

const Loader = props => {
  const { loading } = props;
  return (
    <Modal
      transparent
      animationType='none'
      visible={!!loading}
      onRequestClose={() => { console.log('close modal') }}
    >
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator animating={!!loading} size='large' color={'#2A81C7'} />
          <Text style={{ marginVertical: 10, color: '#2A81C7' }}>Please wait</Text>
        </View>
      </View>
    </Modal>
  )
}

export default Loader;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040'
  },
  activityIndicatorWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
});