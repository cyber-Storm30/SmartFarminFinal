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
import CropDoctorCard from './CropDoctorCard';
import SelectDropdown from 'react-native-select-dropdown';

const CropDoctor = ({navigation}) => {
  const {height, width} = useWindowDimensions();

  const {userId} = useContext(UserContext);

  const [isLoader, setIsLoader] = useState(false);
  const [isError, setIsError] = useState(false);

  //   const [selectedLanguage, setSelectedLanguage] = useState('English');

  const [data, setData] = useState([]);

  const getCropDoctor = async (selectedLanguage = 'English') => {
    setIsLoader(true);
    setIsError(false);
    try {
      const response = await axios.get(
        `${baseURL}/cropDoctor/getCropDoctorByLanguage/?language=${selectedLanguage}`,
      );
      if (response.data.status == 200) {
        setIsLoader(false);
        setData(response.data.crop);
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
      <CropDoctorCard
        item={item}
        index={index}
        navigation={navigation}
        // userId={userId}
      />
    </View>
  );
  const getData = async () => {
    try {
      const {data} = await axios.get(`${baseURL}/cropDoctor/getAllMessage`);
      setMessages(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCropDoctor();
    getData();
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
              <Text
                style={{
                  fontFamily: 'Inter',
                  fontSize: 20,
                  marginTop: 20,
                  fontWeight: '700',
                  color: 'white',
                }}>
                List Of Doctors
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  marginTop: 30,
                  marginBottom: 20,
                }}>
                <Text
                  style={{
                    fontFamily: 'Inter',
                    fontSize: 20,
                    color: 'white',
                    fontWeight: '700',
                    marginRight: 5,
                  }}>
                  Select Language:{' '}
                </Text>
                <SelectDropdown
                  disabled={isLoader}
                  data={['English', 'Bengali', 'Hindi', 'Gujrati', 'Oriya']}
                  defaultValue={'English'}
                  buttonStyle={{
                    width: 100,
                    height: 30,
                    backgroundColor: '#FCF5E5',
                  }}
                  onSelect={(selectedItem, index) => {
                    getCropDoctor(selectedItem);
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

export default CropDoctor;

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
