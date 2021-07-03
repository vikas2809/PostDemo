/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React from 'react';
import AppNavigator from 'App/src/navigation/Nav';
import { Provider } from 'mobx-react';
import store from 'App/src/stores/Store';
import type { Node } from 'react';


const App: () => Node = () => {
  return (
    <Provider {...store}>
      <AppNavigator />
    </Provider>
  );
};

export default App;
