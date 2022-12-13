import {View, Text, TouchableOpacity, Keyboard} from 'react-native';
import React, {useState} from 'react';
import useWindowDimensions from 'react-native/Libraries/Utilities/useWindowDimensions';
import CropAnalysis from '../../CropAnalysis';
import CropDoctor from '../../CropDoctor';
import Message from '../../Message';

const Section = ({navigation}) => {
  const [page, setPage] = useState(0);

  const {width, height} = useWindowDimensions();
  const handlechangePages = () => {
    if (page == 0) return <CropDoctor navigation={navigation} />;
    if (page == 1) return <CropAnalysis navigation={navigation} />;
    if (page == 2) return <Message navigation={navigation} />;
  };
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          width: width - 20,
          paddingTop: 20,
          // backgroundColor: 'red',
        }}>
        <TouchableOpacity
          style={{
            alignItems: 'center',
            paddingRight: 20,
            width: width / 2,
            // backgroundColor: 'red',
          }}
          onPress={() => {
            setPage(0);
          }}>
          <Text
            style={{
              fontSize: 16,
              fontFamily: 'Inter',
              fontWeight: '600',
              color: '#F5F5F5',
            }}>
            Argo Expert
          </Text>
          {page == 0 && (
            <View
              style={{
                width: 150,
                height: 3,
                backgroundColor: '#ffffff',
                marginTop: 2,
              }}
            />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={{alignItems: 'center', width: width / 2}}
          onPress={() => {
            setPage(1);
          }}>
          <Text
            style={{
              fontSize: 16,
              fontFamily: 'Inter',
              fontWeight: '600',
              color: '#F5F5F5',
            }}>
            Crop Analysis
          </Text>
          {page == 1 && (
            <View
              style={{
                width: 150,
                height: 3,
                backgroundColor: '#ffffff',
                marginTop: 2,
              }}
            />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={{alignItems: 'center', width: width / 2}}
          onPress={() => {
            setPage(2);
          }}>
          <Text
            style={{
              fontSize: 16,
              fontFamily: 'Inter',
              fontWeight: '600',
              color: '#F5F5F5',
            }}>
            Message
          </Text>
          {page == 2 && (
            <View
              style={{
                width: 150,
                height: 3,
                backgroundColor: '#ffffff',
                marginTop: 2,
              }}
            />
          )}
        </TouchableOpacity>
      </View>
      {handlechangePages()}
    </>
  );
};

export default Section;
