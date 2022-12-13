import {
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  useWindowDimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useContext, useEffect} from 'react';
import UserContext from '../../../context/userContext';
import {baseURL} from '../../../services';
import {CommonActions, useFocusEffect} from '@react-navigation/native';
import {useCallback} from 'react';
import {useState} from 'react';
import axios from 'axios';
import EditProfileModal from './EditProfileModal';

const Profile = ({navigation}) => {
  const {userId, updateUserId} = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [userData, setUserData] = useState([]);
  const [counter, setCounter] = useState(0);

  const [latestOrder, setLatestOrder] = useState({});
  const [latestProduct, setLatestProduct] = useState([]);
  const [itemCount, setItemCount] = useState(0);

  const [isEditProfile, setIsEditProfile] = useState(false);

  const {width, height} = useWindowDimensions();

  const getUserData = async () => {
    setIsLoading(true);
    setIsError(false);
    try {
      const response = await axios.get(`${baseURL}/user/getUserData/${userId}`);
      console.log(response.data.status);
      console.log(response.data.data);

      if (response.data.status == 200) {
        setIsLoading(false);
        setUserData(response.data.data);
      } else {
        setIsLoading(false);
        setIsError(true);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setIsError(true);
    }
  };

  const getLatestOrder = async (req, res) => {
    try {
      setIsLoading(true);
      setIsError(false);
      const response = await axios.get(
        `${baseURL}/order/getLatestOrderByUserId/${userId}`,
      );
      if (response.data.status == 200) {
        setIsLoading(false);

        setLatestOrder(response.data.order);
        console.log('latestOrder inside get', latestOrder);
        setLatestProduct(response.data.order.cart[0].product);
        setItemCount(response.data.order.cart.length - 1);
      } else {
        setIsLoading(false);
        setIsError(true);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setIsError(true);
    }
  };

  const logout = () => {
    updateUserId('');
    navigation.navigate('Launch');
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [
          {
            name: 'Launch',
          },
        ],
      }),
    );
  };

  useFocusEffect(
    useCallback(() => {
      // Do something when the screen is focused
      getUserData();
      getLatestOrder();
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
        setIsLoading(false);
        setUserData([]);
        setLatestOrder({});
      };
    }, [counter]),
  );

  if (isEditProfile) {
    return (
      <EditProfileModal
        navigation={navigation}
        isEditProfileOpen={isEditProfile}
        setIsEditProfileOpen={setIsEditProfile}
        userId={userId}
        userName={userData.name}
        setCounter={setCounter}
      />
    );
  } else {
    return (
      <TouchableWithoutFeedback
        touchSoundDisabled
        onPress={() => {
          Keyboard.dismiss();
        }}>
        <ScrollView
          style={{
            flex: 1,
            width: '100%',
            backgroundColor: '#141414',
            paddingHorizontal: 20,
          }}>
          {isLoading ? (
            <View
              style={{
                height: height,
                justifyContent: 'center',
                alignContent: 'center',
              }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 30,
                  fontWeight: '700',
                  fontFamily: 'Inter',
                }}>
                Loading....
              </Text>
            </View>
          ) : (
            <View
              style={{
                marginTop: 30,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    // marginLeft: 8,
                    color: 'white',
                    fontSize: 34,
                    fontWeight: '700',
                    fontFamily: 'Inter',
                  }}>
                  Profile
                </Text>
                <TouchableOpacity
                  // style={{width: width - 40, backgroundColor: 'white'}}
                  onPress={logout}>
                  <Text
                    style={{
                      color: '#E30B5C',
                      fontSize: 18,
                      fontWeight: '600',
                      fontFamily: 'Inter',
                    }}>
                    Log Out
                  </Text>
                </TouchableOpacity>
              </View>
              <Text
                style={{
                  marginTop: 24,
                  color: 'white',
                  fontSize: 20,
                  fontWeight: '700',
                  fontFamily: 'Inter',
                }}>
                Name: {userData.name}
              </Text>
              <Text
                style={{
                  marginTop: 12,
                  color: 'white',
                  fontSize: 20,
                  fontWeight: '700',
                  fontFamily: 'Inter',
                }}>
                email: {userData.email}
              </Text>
              <TouchableOpacity
                onPress={() => setIsEditProfile(true)}
                style={{
                  marginVertical: 40,
                  width: width - 40,
                  borderRadius: 6,
                  backgroundColor: 'lightgreen',
                  padding: 16,
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: 20, fontWeight: '700', color: 'white'}}>
                  Edit Profile
                </Text>
              </TouchableOpacity>
              <Text
                style={{
                  marginTop: 30,
                  marginBottom: 20,
                  fontSize: 34,
                  fontWeight: '700',
                  fontFamily: 'Inter',
                }}>
                Orders :
              </Text>
              {latestOrder ? (
                <>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Order')}
                    style={{
                      width: width - 40,
                      borderWidth: 1,
                      borderRadius: 5,
                      borderColor: '#141414',
                      backgroundColor: '#FAF9F6',
                      padding: 10,
                    }}>
                    <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                      <Image
                        resizeMode="contain"
                        source={{
                          uri: latestProduct.image,
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
                        {latestProduct.name} + {itemCount} Other Items
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
                      Total Amount : {latestOrder.totalAmount}
                    </Text>
                    <Text
                      style={{
                        margin: 10,
                        color: 'green',
                        fontSize: 22,
                        fontWeight: '700',
                        fontFamily: 'Inter',
                      }}>
                      Order Status: {latestOrder.orderStatus}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Order')}
                    style={{
                      marginTop: 20,
                      backgroundColor: '#71797E',
                      width: width - 40,
                      borderRadius: 10,
                      alignItems: 'center',
                      padding: 10,
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: 22,
                        fontWeight: '700',
                        fontFamily: 'Inter',
                      }}>
                      See All Orders
                    </Text>
                  </TouchableOpacity>
                </>
              ) : (
                <Text
                  style={{
                    marginTop: 12,
                    color: 'white',
                    fontSize: 24,
                    fontWeight: '700',
                    fontFamily: 'Inter',
                  }}>
                  You Have not ordered anything
                </Text>
              )}
            </View>
          )}
        </ScrollView>
      </TouchableWithoutFeedback>
    );
  }
};

export default Profile;
