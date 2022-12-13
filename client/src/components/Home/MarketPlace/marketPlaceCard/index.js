import {
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
import {baseURL} from '../../../../services/index';

const MarketPlaceCard = ({item, userId}) => {
  const [isSeeMore, setIsSeeMore] = useState(true);
  const [addedCart, setAddedCart] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAvailable, setIsAvailable] = useState(
    item.quantity > 0 ? true : false,
  );
  // const {userId} = route.params;

  const handleAddToCart = async () => {
    try {
      setIsLoading(true);
      const res = await axios.post(`${baseURL}/cart/postCartByUserId`, {
        user: userId,
        product: item._id,
        selectedQuantity: 1,
      });
      if (res.data.status == 201) {
        setIsLoading(false);
        setAddedCart(true);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveFromCart = async () => {
    try {
      setIsLoading(true);
      const res = await axios.delete(
        `${baseURL}/cart/removeCartByProductId/${item._id}`,
      );
      if (res.data.status == 201) {
        setIsLoading(false);
        setAddedCart(false);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
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
            fontSize: 16,
            marginBottom: 10,
          }}>
          {item.name}
        </Text>
        <Image
          resizeMode="contain"
          style={{height: 150}}
          source={{uri: item.image}}
        />
        {isSeeMore ? (
          <Text
            style={{
              color: '#333333',
              fontWeight: '500',
              fontSize: 14,
              marginTop: 10,
            }}>
            {item.description.slice(0, 80)}
            {item.description.length > 80 && (
              <>
                {isSeeMore && (
                  <Text
                    onPress={() => setIsSeeMore(!isSeeMore)}
                    style={{fontSize: 14, color: 'grey'}}>
                    ... See More
                  </Text>
                )}
              </>
            )}
          </Text>
        ) : (
          <Text
            style={{
              color: '#333333',
              fontWeight: '500',
              fontSize: 14,
              marginTop: 10,
            }}>
            {item.description}
          </Text>
        )}
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TouchableOpacity
            style={{
              marginTop: 20,
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
              ₹ {item.price}
            </Text>
          </TouchableOpacity>
          {addedCart ? (
            <TouchableOpacity
              onPress={handleRemoveFromCart}
              style={{
                marginTop: 20,
                paddingHorizontal: 15,
                paddingVertical: 10,
                backgroundColor: 'orange',
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
                {isLoading ? 'loading' : 'Added'}
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={handleAddToCart}
              disabled={!isAvailable}
              style={{
                marginTop: 20,
                paddingHorizontal: 15,
                paddingVertical: 10,
                backgroundColor: isAvailable ? 'orange' : 'grey',
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
                {isLoading
                  ? 'loading'
                  : isAvailable
                  ? 'Add to Cart'
                  : 'Out of Stock'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default MarketPlaceCard;

const styles = StyleSheet.create({});
