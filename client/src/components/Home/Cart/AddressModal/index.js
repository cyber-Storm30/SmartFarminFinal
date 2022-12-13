import {
  StyleSheet,
  View,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
  Image,
  useWindowDimensions,
  TouchableOpacity,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import Input from '../../../../shared/Input';
import {useEffect} from 'react';
import axios from 'axios';
import {baseURL} from '../../../../services';

const AddressModal = ({
  navigation,
  isAddressOpen,
  setIsAddressOpen,
  userId,
  totalAmount,
}) => {
  const {height, width} = useWindowDimensions();
  console.log('userId in AddressModal', userId);
  console.log('totalAmount in AddressModal', totalAmount);

  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostal] = useState('');
  const [country, setCountry] = useState('');

  const [disable, setDisable] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    if (
      address.length > 0 &&
      city.length > 0 &&
      postalCode.length > 0 &&
      country.length > 0
    ) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [address, city, postalCode, country]);

  const handlePlaceOrder = async () => {
    try {
      setIsLoading(true);
      const res = await axios.post(`${baseURL}/order/postOrderByUserId`, {
        user: userId,
        totalAmount,
        orderAddress: {
          address,
          city,
          postalCode,
          country,
        },
      });
      if (res.data.status === 201) {
        setConfirmed(true);
      } else {
        Alert.alert('Failed to Place Order, Try Again');
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Failed to Place Order, Try Again');
    }
  };

  const handleNavigateToProfile = () => {
    navigation.navigate('Profile');
    setIsAddressOpen(false);
  };

  return (
    <TouchableWithoutFeedback
      touchSoundDisabled
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <Modal
        visible={isAddressOpen}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsAddressOpen(false)}>
        <ScrollView style={styles.container}>
          {confirmed ? (
            <>
              <View
                style={{
                  //   marginLeft: 20,
                  marginBottom: 20,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <TouchableOpacity onPress={handleNavigateToProfile}>
                  <Text
                    style={{
                      color: 'white',
                      fontWeight: '700',
                      fontSize: 20,
                    }}>
                    {`< Back`}
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  marginTop: 80,
                  alignItems: 'center',
                }}>
                <Image
                  style={{height: height / 3, width: width / 1.5}}
                  source={{
                    uri: 'https://cdn.pixabay.com/photo/2021/08/07/22/32/verified-6529513_960_720.png',
                  }}
                />
                <Text
                  style={{
                    marginTop: 20,
                    color: 'lightgreen',
                    fontSize: 24,
                    fontWeight: '800',
                  }}>
                  Order Confirmed !
                </Text>
                <TouchableOpacity onPress={handleNavigateToProfile}>
                  <Text style={{fontSize: 16, marginTop: 10}}>
                    Go to Profile Section to view orders
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <>
              <View
                style={{
                  //   marginLeft: 20,
                  marginBottom: 20,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <TouchableOpacity onPress={() => setIsAddressOpen(false)}>
                  <Text
                    style={{
                      color: 'white',
                      fontWeight: '700',
                      fontSize: 20,
                    }}>
                    {` <  Back`}
                  </Text>
                </TouchableOpacity>
              </View>
              <Text
                style={{
                  marginTop: 20,
                  alignSelf: 'center',
                  fontSize: 24,
                  color: 'white',
                  fontWeight: '700',
                }}>
                Add Address
              </Text>
              <View style={{marginTop: 30}}>
                <Input
                  heading="Address"
                  //   disableInputHeading={true}
                  placeholder="Enter Address"
                  onChange={val => {
                    setAddress(val);
                  }}
                  name="address"
                  value={address}
                  required
                />
              </View>
              <View style={{marginTop: 20}}>
                <Input
                  heading="City"
                  //   disableInputHeading={true}
                  placeholder="Enter City"
                  onChange={val => {
                    setCity(val);
                  }}
                  name="city"
                  value={city}
                  required
                />
              </View>
              <View style={{marginTop: 20}}>
                <Input
                  heading="Postal Code"
                  //   disableInputHeading={true}
                  placeholder="Enter Postal Code"
                  onChange={val => {
                    setPostal(val);
                  }}
                  name="postalCode"
                  value={postalCode}
                  required
                />
              </View>
              <View style={{marginTop: 20}}>
                <Input
                  heading="Country"
                  //   disableInputHeading={true}
                  placeholder="Enter Country"
                  onChange={val => {
                    setCountry(val);
                  }}
                  name="country"
                  value={country}
                  required
                />
              </View>
              <TouchableOpacity
                onPress={handlePlaceOrder}
                disabled={disable && !isLoading}
                style={{
                  width: width - 40,
                  marginVertical: 40,
                  borderRadius: 6,
                  backgroundColor: disable ? 'grey' : 'lightgreen',
                  padding: 16,
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: 20, fontWeight: '700', color: 'white'}}>
                  {isLoading ? 'Loading...' : 'Place Order'}
                </Text>
              </TouchableOpacity>
            </>
          )}
        </ScrollView>
      </Modal>
    </TouchableWithoutFeedback>
  );
};

export default AddressModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#141414',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
});
