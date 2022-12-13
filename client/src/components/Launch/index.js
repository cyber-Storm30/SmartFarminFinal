import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';

const Launch = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={{alignItems: 'center', marginTop: 120}}>
        <View
          style={{
            flexWrap: 'wrap',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text
            style={{
              marginLeft: 8,
              color: 'white',
              fontSize: 34,
              fontWeight: '700',
              fontFamily: 'Inter',
            }}>
            Smart Farming
          </Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text
            style={{
              color: 'white',
              fontSize: 24,
              fontWeight: '700',
              fontFamily: 'Inter',
            }}>
            Sign Up
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text
            style={{
              marginTop: 20,
              color: 'white',
              fontSize: 24,
              fontWeight: '700',
              fontFamily: 'Inter',
            }}>
            Log In
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: '#141414',
    paddingHorizontal: 20,
    flex: 1,
  },
  buttonContainer: {
    flex: 0.5,
    justifyContent: 'flex-end',
    paddingBottom: 20,
    alignItems: 'center',
  },
});

export default Launch;
