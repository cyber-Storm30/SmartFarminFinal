import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';
import {useState} from 'react';
import axios from 'axios';
import {baseURL} from '../../../../services';
import SelectDropdown from 'react-native-select-dropdown';

const CartCard = ({item, setCounter}) => {
  const [addedCart, setAddedCart] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // const handleAddToCart = async () => {
  //   try {
  //     setIsLoading(true);
  //     const res = await axios.post(`${baseURL}/cart/postProduct`, {
  //       user: userId,
  //       product: item._id,
  //       selectedQuantity: 1,
  //     });
  //     if (res.data.status == 201) {
  //       setIsLoading(false);
  //       setAddedCart(true);
  //     } else {
  //       setIsLoading(false);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleRemoveFromCart = async () => {
    try {
      setIsLoading(true);
      const res = await axios.delete(
        `${baseURL}/cart/removeCartById/${item._id}`,
      );
      if (res.data.status == 201) {
        setIsLoading(false);
        setCounter(prevstate => prevstate + 1);
      } else {
        setIsLoading(false);
        Alert.alert('Failed to remove from cart');
      }
    } catch (error) {
      setIsLoading(false);
      Alert.alert('Failed to remove from cart, Some Error Occured');
      console.log(error);
    }
  };

  const handleUpdateQuantity = async selectedItem => {
    try {
      setIsLoading(true);
      const res = await axios.patch(`${baseURL}/cart/updateQuantityById`, {
        id: item._id,
        selectedQuantity: selectedItem,
      });
      if (res.data.status == 201) {
        setIsLoading(false);
        setCounter(prevstate => prevstate + 1);
      } else {
        setIsLoading(false);
        Alert.alert('Failed to update quantity');
      }
    } catch (error) {
      setIsLoading(false);
      Alert.alert(
        'Failed to update the quantity from cart, Some Error Occured',
      );
      console.log(error);
    }
  };

  return (
    <TouchableWithoutFeedback>
      <View
        style={{
          marginTop: 20,
          borderWidth: 1,
          borderRadius: 5,
          borderColor: '#141414',
          backgroundColor: '#FAF9F6',
          padding: 10,
        }}>
        <Text
          style={{
            color: 'black',
            fontWeight: '700',
            fontSize: 20,
            marginBottom: 10,
            marginHorizontal: 20,
          }}>
          {item.product.name}
        </Text>
        <Image
          resizeMode="contain"
          style={{height: 80}}
          source={{uri: item.product.image}}
        />
        <View style={{flexDirection: 'row', marginTop: 10}}>
          <Text
            style={{
              color: 'black',
              fontWeight: '700',
              fontSize: 20,
              marginBottom: 10,
              marginHorizontal: 20,
            }}>
            Quantity :
          </Text>
          <SelectDropdown
            disabled={isLoading}
            data={Array.from({length: item.product.quantity}, (_, i) => i + 1)}
            defaultValue={item.selectedQuantity}
            buttonStyle={{
              width: 50,
              height: 30,
              backgroundColor: '#FCF5E5',
            }}
            onSelect={(selectedItem, index) => {
              handleUpdateQuantity(selectedItem);
              console.log(selectedItem, index);
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              // text represented after item is selected
              // if data array is an array of objects then return selectedItem.property to render after item is selected
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              // text represented for each item in dropdown
              // if data array is an array of objects then return item.property to represent item in dropdown
              return item;
            }}
          />
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TouchableOpacity
            style={{
              marginTop: 10,
              paddingHorizontal: 15,
              paddingVertical: 10,
              backgroundColor: 'black',
              borderRadius: 40,
              width: 120,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                textAlignVertical: 'center',
                color: 'white',
                fontWeight: '700',
                fontSize: 16,
              }}>
              $ {item.product.price}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleRemoveFromCart}
            disabled={isLoading}
            style={{
              marginTop: 10,
              paddingHorizontal: 15,
              paddingVertical: 10,
              backgroundColor: '#DE3163',
              borderRadius: 40,
              width: 120,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                textAlignVertical: 'center',
                color: 'white',
                fontWeight: '700',
                fontSize: 16,
              }}>
              {isLoading ? 'loading' : 'Remove'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CartCard;

const styles = StyleSheet.create({});
