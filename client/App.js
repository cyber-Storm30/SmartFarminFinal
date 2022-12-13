import React, {useContext, useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import linking from './config/linking';
import Launch from './src/components/Launch';
import Login from './src/components/Login';
import Signup from './src/components/Signup';
import Home from './src/components/Home';
import UserContext from './src/context/userContext';

const Stack = createNativeStackNavigator();

const App = () => {
  const {userId} = useContext(UserContext);
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator
        screenOptions={{headerShown: false, animation: 'slide_from_right'}}
        initialRouteName={userId.length > 0 ? 'Home' : 'Launch'}>
        <Stack.Screen name="Launch" component={Launch} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
