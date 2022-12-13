import {createContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserContext = createContext();

export const UserProvider = ({children}) => {
  const [isIdLoading, setIsIdLoading] = useState(false);
  const [isIdError, setIsIdError] = useState(false);
  const [userIdValue, setUserIdValue] = useState('');

  const [userId, setUserId] = useState('');

  const fetchUserId = async () => {
    setIsIdLoading(true);
    setIsIdError(false);
    try {
      const value = await AsyncStorage.getItem('userId');
      console.log('userId in context', value);
      if (value !== null) {
        setUserId(value);
      }
      setIsIdLoading(false);
      setIsIdError(false);
    } catch (e) {
      setIsIdLoading(false);
      setIsIdError(true);
      setUserId('');
      console.log(e);
    }
  };

  const updateUserId = async value => {
    setIsIdLoading(true);
    setIsIdError(false);
    try {
      const result = await AsyncStorage.setItem('userId', value);
      console.log('update userId in context', result);
      fetchUserId();
      setIsIdLoading(false);
      setIsIdError(false);
    } catch (error) {
      setIsIdLoading(false);
      setIsIdError(true);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserId();
  }, []);

  return (
    <UserContext.Provider
      value={{
        isIdLoading,
        isIdError,
        userId,
        updateUserId,
      }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
