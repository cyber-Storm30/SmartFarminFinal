import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {baseURL} from '../../../services/index';
import axios from 'axios';
import CartCard from './CartCard';
import {useFocusEffect} from '@react-navigation/native';
import {useCallback} from 'react';
import UserContext from '../../../context/userContext';
import AddressModal from './AddressModal';

const Cart = ({navigation}) => {
  const {width, height} = useWindowDimensions();

  const {userId} = useContext(UserContext);

  const [isAddressModal, setIsAddressModal] = useState(false);

  const [isLoader, setIsLoader] = useState(false);
  const [isError, setIsError] = useState(false);
  const [counter, setCounter] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const [data, setData] = useState([]);

  const getCart = async () => {
    setIsLoader(true);
    setIsError(false);
    try {
      const response = await axios.get(
        `${baseURL}/cart/getCartByUserId/${userId}`,
      );
      console.log(response.data.status);
      console.log(response.data.cart);

      if (response.data.status == 200) {
        setIsLoader(false);
        const cost = response.data.cart.reduce(
          (sum, curr) => sum + curr.product.price * curr.selectedQuantity,
          0,
        );
        console.log('total amount', cost);
        setData(response.data.cart);
        setTotalAmount(cost);
      } else {
        setIsLoader(false);
        setIsError(true);
      }
    } catch (error) {
      console.log(error);
      setIsLoader(false);
      setIsError(true);
    }
  };

  const renderItem = ({item, index}) => (
    <View style={styles.feedContainer}>
      <CartCard
        item={item}
        index={index}
        navigation={navigation}
        setCounter={setCounter}
      />
    </View>
  );

  // useEffect(() => {
  //   getCart();
  // }, [navigation, counter]);

  useFocusEffect(
    useCallback(() => {
      // Do something when the screen is focused
      getCart();
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
        setIsLoader(false);
        setData([]);
        setTotalAmount(0);
      };
    }, [counter]),
  );

  if (isAddressModal) {
    return (
      <AddressModal
        isAddressOpen={isAddressModal}
        setIsAddressOpen={setIsAddressModal}
        userId={userId}
        totalAmount={totalAmount}
        navigation={navigation}
      />
    );
  } else {
    return (
      <TouchableWithoutFeedback
        touchSoundDisabled
        onPress={() => {
          Keyboard.dismiss();
        }}>
        <SafeAreaView style={styles.container}>
          <FlatList
            ListHeaderComponent={
              <>
                <Text
                  style={{
                    marginTop: 30,
                    paddingHorizontal: 16,
                    color: 'white',
                    fontSize: 24,
                    fontFamily: 'Inter',
                    marginBottom: 20,
                  }}>
                  Cart
                </Text>
                {isLoader && (
                  <View style={{marginTop: 150}}>
                    <Text
                      style={{fontSize: 24, color: 'white', fontWeight: '700'}}>
                      Loading...
                    </Text>
                  </View>
                )}
                {isError && (
                  <View
                    style={{
                      marginTop: height * 0.1,
                      // marginHorizontal: 50,
                      // alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                    }}>
                    <Text
                      style={{
                        marginTop: 30,
                        textAlign: 'center',
                        fontFamily: 'Inter',
                        alignContent: 'center',
                        fontWeight: '500',
                        color: '#FFFFFF',
                        fontSize: 16,
                      }}>
                      Some unexpected error occurred, or your data connection
                      got lost.
                    </Text>
                  </View>
                )}
              </>
            }
            // ListFooterComponent={
            //   <View
            //     style={{
            //       flexDirection: 'row',
            //       backgroundColor: '#C8A2C8',
            //       padding: 20,
            //       justifyContent: 'space-between',
            //     }}>
            //     <TouchableOpacity
            //       style={{
            //         // marginTop: 20,
            //         paddingHorizontal: 10,
            //         paddingVertical: 10,
            //         backgroundColor: 'black',
            //         borderRadius: 30,
            //         width: 120,
            //         alignItems: 'center',
            //         justifyContent: 'center',
            //       }}>
            //       <Text
            //         style={{
            //           textAlignVertical: 'center',
            //           color: 'white',
            //           fontWeight: '700',
            //           fontSize: 15,
            //         }}>
            //         $ {totalAmount}
            //       </Text>
            //     </TouchableOpacity>
            //     <TouchableOpacity
            //       style={{
            //         // marginTop: 20,
            //         paddingHorizontal: 15,
            //         paddingVertical: 12,
            //         backgroundColor: '#14670b',
            //         borderRadius: 10,
            //         width: 160,
            //         alignItems: 'center',
            //         justifyContent: 'center',
            //       }}>
            //       <Text
            //         style={{
            //           textAlignVertical: 'center',
            //           color: 'white',
            //           fontWeight: '700',
            //           fontSize: 16,
            //         }}>
            //         Place Order
            //       </Text>
            //     </TouchableOpacity>
            //   </View>
            // }
            // ListFooterComponentStyle={{flexGrow: 1, justifyContent: 'flex-end'}}
            // contentContainerStyle={{flexGrow: 1}}
            data={data}
            keyExtractor={item => item._id}
            ListEmptyComponent={
              <View style={{marginTop: height / 4, alignItems: 'center'}}>
                <Text style={{fontSize: 18}}>Cart is Empty!</Text>
              </View>
            }
            renderItem={renderItem}
          />
          <View
            style={{
              // alignSelf: 'flex-end',
              flexDirection: 'row',
              backgroundColor: '#C8A2C8',
              padding: 20,
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              style={{
                // marginTop: 20,
                paddingHorizontal: 10,
                paddingVertical: 10,
                backgroundColor: 'black',
                borderRadius: 30,
                width: 120,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  textAlignVertical: 'center',
                  color: 'white',
                  fontWeight: '700',
                  fontSize: 15,
                }}>
                $ {totalAmount}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={data.length > 0 ? false : true}
              onPress={() => setIsAddressModal(true)}
              style={{
                // marginTop: 20,
                paddingHorizontal: 15,
                paddingVertical: 12,
                backgroundColor: data.length > 0 ? '#14670b' : 'grey',
                borderRadius: 10,
                width: 160,
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
                Place Order
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    );
  }
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#141414',
  },
  feedContainer: {
    // marginTop: 16, // temporary css style remove when its use is over
    paddingHorizontal: 16,
  },
  bottomNavbar: {},
});
