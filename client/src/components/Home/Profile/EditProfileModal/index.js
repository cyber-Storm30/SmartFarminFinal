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

const EditProfileModal = ({
  navigation,
  isEditProfileOpen,
  setIsEditProfileOpen,
  userId,
  userName,
  setCounter,
}) => {
  const {height, width} = useWindowDimensions();
  console.log('userId in EditProfileModal', userId);
  console.log('name in EditProfileModal', userName);

  const [name, setName] = useState(userName);

  const [disable, setDisable] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleEditProfile = async () => {
    try {
      setIsLoading(true);
      const res = await axios.patch(`${baseURL}/user/updateUserData`, {
        userId,
        name,
      });
      if (res.data.status == 201) {
        setIsEditProfileOpen(false);
        setCounter(prev => prev + 1);
      } else {
        Alert.alert('Some Error Occurred, Try Again');
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Some Error Occurred, Try Again');
    }
  };

  useEffect(() => {
    if (name.length > 0) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [name]);

  return (
    <TouchableWithoutFeedback
      touchSoundDisabled
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <Modal
        visible={isEditProfileOpen}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsEditProfileOpen(false)}>
        <ScrollView style={styles.container}>
          <View
            style={{
              //   marginLeft: 20,
              marginBottom: 20,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity onPress={() => setIsEditProfileOpen(false)}>
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
            Edit Profile
          </Text>
          <View style={{marginTop: 30}}>
            <Input
              heading="Name"
              //   disableInputHeading={true}
              placeholder="Edit Name"
              onChange={val => {
                setName(val);
              }}
              name="name"
              value={name}
              required
            />
          </View>
          <TouchableOpacity
            onPress={handleEditProfile}
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
              {isLoading ? 'Loading...' : 'Edit Profile'}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </Modal>
    </TouchableWithoutFeedback>
  );
};

export default EditProfileModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#141414',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
});
