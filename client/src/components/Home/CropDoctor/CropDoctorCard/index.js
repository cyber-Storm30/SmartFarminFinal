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

const CropDoctorCard = ({item, navigation}) => {
  const {height, width} = useWindowDimensions();
  console.log('order section', item.cart);
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
      }}>
      <Text
        style={{
          margin: 5,
          color: 'black',
          fontSize: 16,
          fontWeight: '700',
          fontFamily: 'Inter',
        }}>
        Name : {item.name}
      </Text>
      <Text
        style={{
          margin: 5,
          color: 'black',
          fontSize: 16,
          fontWeight: '700',
          fontFamily: 'Inter',
        }}>
        Email: {item.email}
      </Text>
      <Text
        style={{
          margin: 5,
          color: 'black',
          fontSize: 16,
          fontWeight: '700',
          fontFamily: 'Inter',
        }}>
        Phone Number: {item.phone_number}
      </Text>
      <Text
        style={{
          margin: 5,
          color: 'black',
          fontSize: 16,
          fontWeight: '700',
          fontFamily: 'Inter',
        }}>
        Language:{' '}
        {item.language.map(lang => (
          <Text
            style={{
              margin: 5,
              color: 'black',
              fontSize: 16,
              fontWeight: '700',
              fontFamily: 'Inter',
            }}>
            {' '}
            {lang}{' '}
          </Text>
        ))}
      </Text>
    </TouchableOpacity>
  );
};

export default CropDoctorCard;

const styles = StyleSheet.create({});
