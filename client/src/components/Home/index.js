import React, {useRef} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MarketPlace from './MarketPlace';
import Cart from './Cart';
import Profile from './Profile';
import {Text} from 'react-native';
import Order from './Order';
import AgroPlus from './AgroPlus';

const Tab = createBottomTabNavigator();

const Home = ({navigation}) => {
  return (
    <>
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          headerShown: false,
          animation: 'slide_from_right',
          tabBarStyle: {
            backgroundColor: '#141414',
            borderTopWidth: 0,
          },
          tabBarActiveTintColor: 'lightgreen',
          tabBarInactiveTintColor: 'white',
        }}
        initialRouteName={'MarketPlace'}>
        <Tab.Screen
          name="MarketPlace"
          component={MarketPlace}
          options={{
            tabBarIcon: ({color, size}) => (
              <Text style={{color: color, fontFamily: 'Inter', fontSize: 15}}>
                MarketPlace
              </Text>
            ),
          }}
        />
        <Tab.Screen
          name="Cart"
          component={Cart}
          options={{
            tabBarIcon: ({color, size}) => (
              <Text style={{color: color, fontFamily: 'Inter', fontSize: 15}}>
                Cart
              </Text>
            ),
          }}
        />
        <Tab.Screen
          name="AgroPlus"
          component={AgroPlus}
          options={{
            tabBarIcon: ({color, size}) => (
              <Text style={{color: color, fontFamily: 'Inter', fontSize: 15}}>
                Agro+
              </Text>
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: ({color, size}) => (
              <Text style={{color: color, fontFamily: 'Inter', fontSize: 15}}>
                Profile
              </Text>
            ),
          }}
        />
        <Tab.Screen
          name="Order"
          component={Order}
          options={{
            tabBarStyle: {display: 'none'},
            tabBarButton: () => null,
            tabBarVisible: false,
          }}
        />
      </Tab.Navigator>
    </>
  );
};

export default Home;
