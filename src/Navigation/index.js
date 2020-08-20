import React from 'react';

import {} from 'react-native';

import {Colors} from '../Assets';

import Registration from '../Screens/Registration';

import Home from '../Screens/Home';

import AddTask from '../Screens/AddTask';

import {createStackNavigator} from '@react-navigation/stack';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Icons from 'react-native-vector-icons/MaterialCommunityIcons';

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === 'TODO') {
            iconName = focused ? 'calendar-text' : 'calendar-text-outline';
          } else if (route.name === 'All TODO') {
            iconName = focused ? 'clipboard-list' : 'clipboard-list-outline';
          }
          return <Icons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: Colors.MainColor,
        inactiveTintColor: Colors.SecondRelativeMainColor,
      }}>
      <Tab.Screen name="TODO" component={TODOStack} />
      <Tab.Screen name="All TODO" component={AllTODOStack} />
    </Tab.Navigator>
  );
};

const TODOStack = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="AddTask" component={AddTask} />
    </Stack.Navigator>
  );
};

const AllTODOStack = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Registration" component={Registration} />
    </Stack.Navigator>
  );
};

const MainStackNavigator = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Registration" component={BottomTabNavigator} />
      <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
