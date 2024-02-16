import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import HomeNavigator from './navigation/HomeNavigator';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import './locale/i18n';

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <HomeNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
