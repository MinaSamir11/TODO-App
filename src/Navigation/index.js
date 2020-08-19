import React from 'react';

import {} from 'react-native';

import Registration from '../Screens/Registration';

import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="WelcomeStack" component={Registration} />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
