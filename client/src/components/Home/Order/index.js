import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {baseURL} from '../../../services/index';
import axios from 'axios';
import UserContext from '../../../context/userContext';
import OrderCard from './OrderCard';

const Order = ({navigation}) => {
  const {height, widht} = useWindowDimensions();

  const {userId} = useContext(UserContext);

  const [isLoader, setIsLoader] = useState(false);
  const [isError, setIsError] = useState(false);

  const [data, setData] = useState([]);

  const getOrder = async () => {
    setIsLoader(true);
    setIsError(false);
    try {
      const response = await axios.get(
        `${baseURL}/order/getOrderByUserId/${userId}`,
      );
      console.log(response.data.status);
      console.log(response.data.order);

      if (response.data.status == 200) {
        setIsLoader(false);
        setData(response.data.order);
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
      <OrderCard
        item={item}
        index={index}
        navigation={navigation}
        // userId={userId}
      />
    </View>
  );

  useEffect(() => {
    getOrder();
  }, [navigation]);

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
              <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                <Text
                  style={{
                    marginHorizontal: 20,
                    marginTop: 10,
                    color: 'white',
                    fontWeight: '700',
                    fontSize: 20,
                  }}>
                  {` <  Back`}
                </Text>
              </TouchableOpacity>
              <Text
                style={{
                  marginTop: 30,
                  paddingHorizontal: 16,
                  color: 'white',
                  fontSize: 24,
                  fontFamily: 'Inter',
                  marginBottom: 20,
                }}>
                Your Orders :
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
                    Some unexpected error occurred, or your data connection got
                    lost.
                  </Text>
                </View>
              )}
            </>
          }
          data={data}
          keyExtractor={item => item._id}
          renderItem={renderItem}
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default Order;

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
