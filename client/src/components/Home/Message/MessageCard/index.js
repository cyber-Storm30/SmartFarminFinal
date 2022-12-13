import {View, Text} from 'react-native';
import React from 'react';

const MessageCard = ({data}) => {
  return (
    <View
      style={{
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: data?.status === '1' ? 'whitesmoke' : 'wheat',
        borderWidth: 1,
        borderColor: data?.status === '1' ? 'black' : 'none',
        width: 150,
        marginTop: 10,
        borderRadius: 10,
      }}>
      <Text>{data.message}</Text>
    </View>
  );
};

export default MessageCard;
