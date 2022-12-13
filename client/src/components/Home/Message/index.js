import {
  View,
  Text,
  ScrollView,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {baseURL} from '../../../services/index';
import MessageCard from './MessageCard';
import axios from 'axios';

const Message = ({navigation}) => {
  const [messages, setMessages] = useState([]);
  const [singleMessage, setSingleMessage] = useState('');

  const getData = async () => {
    try {
      const {data} = await axios.get(`${baseURL}/cropDoctor/getAllMessage`);
      console.log('Message', data);
      setMessages(data);
    } catch (err) {
      console.log(err);
    }
  };

  const renderItem = ({item, index}) => {
    return <MessageCard data={item} key={index} />;
  };

  useEffect(() => {
    getData();
  }, [navigation]);

  const handleMessageSend = async () => {
    if (singleMessage.length > 0) {
      const newMessage = {
        message: singleMessage,
        status: '2',
      };
      setMessages([...messages, newMessage]);
      setSingleMessage('');
      try {
        const res = await axios.post(
          `${baseURL}/cropDoctor/postMessage`,
          newMessage,
        );
        setSingleMessage('');
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <View>
      <FlatList data={messages} renderItem={renderItem} />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <TextInput
          placeholder="Write you query here"
          onChangeText={val => {
            setSingleMessage(val);
          }}
          style={{
            width: '83%',
            height: 40,
            padding: 5,
            borderRadius: 10,
            outline: 'none',
            borderWidth: 1,
            borderColor: 'gray',
            border: 'none',
            marginTop: 5,
            backgroundColor: 'lightgray',
          }}
        />

        <TouchableOpacity
          onPress={handleMessageSend}
          style={{
            width: 50,
            height: 30,
            backgroundColor: 'gray',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 5,
            marginLeft: 10,
          }}>
          <Text>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Message;
