import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  useWindowDimensions,
  View,
} from 'react-native';
import React from 'react';

const CropAnalysisCard = ({item, navigation}) => {
  const {height, width} = useWindowDimensions();
  return (
    <TouchableOpacity
      //   onPress={() => navigation.navigate('Order')}
      style={{
        // width: width - 40,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#141414',
        backgroundColor: '#FAF9F6',
        padding: 10,
        marginBottom: 20,
        flexDirection: 'row',
        flexWrap: 'nowrap',
      }}>
      <Text
        style={{
          marginRight: 30,
          color: 'black',
          fontSize: 15,
          fontWeight: '700',
          fontFamily: 'Inter',
        }}>
        {item.name}
      </Text>
      {item.cropData.map(crop => (
        <Text
          style={{
            marginRight: 36,
            color: 'black',
            fontSize: 18,
            fontWeight: '700',
            fontFamily: 'Inter',
          }}>
          {crop}
        </Text>
      ))}
    </TouchableOpacity>
  );
};

export default CropAnalysisCard;

const styles = StyleSheet.create({});
