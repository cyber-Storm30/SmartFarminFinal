import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  Keyboard,
} from 'react-native';
import React from 'react';
import Section from './Section';

const AgroPlus = ({navigation}) => {
  return (
    <TouchableWithoutFeedback
      touchSoundDisabled
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <SafeAreaView style={styles.container}>
        <View style={{paddingHorizontal: 10}}>
          <Text
            style={{
              fontSize: 24,
              color: 'white',
              fontWeight: '700',
              fontFamily: 'Inter',
            }}>
            AgroPlus
          </Text>
        </View>
        <Section navigation={navigation} />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default AgroPlus;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#141414',
    // paddingVertical: 10,
    paddingVertical: 30,
    paddingHorizontal: 10,
    color: 'white',
  },
});
