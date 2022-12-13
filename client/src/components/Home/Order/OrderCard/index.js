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

const OrderCard = ({item, navigation}) => {
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
      <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
        <Image
          resizeMode="contain"
          source={{
            uri: item.cart[0].product.image,
          }}
          style={{height: 80, width: 80}}
        />
        <Text
          style={{
            marginLeft: 20,
            color: 'black',
            fontSize: 24,
            fontWeight: '700',
            fontFamily: 'Inter',
          }}>
          {item.cart[0].product.name} + {item.cart.length - 1} Other Items
        </Text>
      </View>
      <Text
        style={{
          margin: 10,
          color: 'black',
          fontSize: 22,
          fontWeight: '700',
          fontFamily: 'Inter',
        }}>
        Total Amount : {item.totalAmount}
      </Text>
      <Text
        style={{
          margin: 10,
          color: 'green',
          fontSize: 22,
          fontWeight: '700',
          fontFamily: 'Inter',
        }}>
        Order Status: {item.orderStatus}
      </Text>
    </TouchableOpacity>
  );
};

export default OrderCard;

const styles = StyleSheet.create({});
