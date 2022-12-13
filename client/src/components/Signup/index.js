import {
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect} from 'react';
import Input from '../../shared/Input';
import {useState} from 'react';
import axios from 'axios';
import {baseURL} from '../../services';
import {useContext} from 'react';
import UserContext from '../../context/userContext';

const Signup = ({navigation}) => {
  const {updateUserId} = useContext(UserContext);
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [signUpError, setSignUpError] = useState(false);
  const [SignUpErrorText, setSignUpErrorText] = useState('');
  const {width, height} = useWindowDimensions();

  const [disabled, setDisabled] = useState(true);
  const multiErrorMessage = [
    'Doesn’t meet of the one or more parameters:',
    'a) Minimum of 8 characters',
    'b) A upper case',
    'c) A numeric Character',
    'd) A special symbol ( !@#$%^ ) missing',
  ];

  // const dispatch = useDispatch();

  useEffect(() => {
    if (password && email && !passwordError && !emailError) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [password, email, passwordError, emailError]);

  useEffect(() => {
    if (password.length === 0) {
      setPasswordError(false);
    }
    if (email.length === 0) {
      setEmailError(false);
    }
  }, [password, email]);

  const handleSignup = async () => {
    setLoading(true);
    setSignUpError(false);
    console.log('consoling name email password', name, email, password);
    const res = await axios.post(`${baseURL}/user/signup`, {
      name: name,
      email: email,
      password: password,
    });
    setLoading(false);
    console.log('res', res);
    console.log('resData', res.data);
    if (res.data.status == 201) {
      updateUserId(res.data.data._id);
      navigation.navigate('Home');
    } else if (res.data.status == 400) {
      setSignUpError(true);
      setSignUpErrorText(`User already exists`);
    } else if (res.data.status == 500) {
      setSignUpError(true);
      setSignUpErrorText(`Something went wrong! Please Try Again Later`);
    }
  };

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
        <View
          style={{
            marginTop: 80,
            flexWrap: 'wrap',
            flexDirection: 'row',
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
            Smart Farming
          </Text>
        </View>
        {/* <View
          style={{
            marginTop: 40,
            flexWrap: 'wrap',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text
            style={{
              // marginLeft: 8,
              color: 'white',
              fontSize: 28,
              fontWeight: '700',
              fontFamily: 'Inter',
            }}>
            Sign Up
          </Text>
        </View> */}
        <View style={{marginTop: 32}} />
        <Input
          disableInputHeading={true}
          heading="Name"
          placeholder="Enter full name"
          onChange={val => {
            setName(val);
          }}
          name="fullName"
          value={name}
          errorMessage="Name Should be Full Name"
          error={nameError}
          setError={setNameError}
          required
        />
        <View style={{marginTop: 32}} />
        <Input
          heading="Email Address"
          disableInputHeading={true}
          placeholder="Enter Email"
          onChange={val => {
            setEmail(val);
          }}
          name="email"
          value={email}
          errorMessage="Not a valid email format"
          error={emailError}
          setError={setEmailError}
          required
        />
        <View style={{marginTop: 32}} />
        <Input
          disableInputHeading={true}
          heading="Password"
          placeholder="Enter Password"
          onChange={val => {
            setPassword(val);
          }}
          name="password"
          value={password}
          required={true}
          multiErrorMessage={multiErrorMessage}
          error={passwordError}
          setError={setPasswordError}
          secureTextEntry={!showPassword}
          setShowPassword={setShowPassword}
          helperText="Minimum of 8 characters, with upper case, a number and a symbol ( !@#$%^ )"
          icon={
            !showPassword ? (
              <Text style={{color: 'black', right: 4}}>Show</Text>
            ) : (
              // {/* <EyeClose name="eye" size={30} color="black" /> */}
              <Text style={{color: 'black', right: 4}}>Hide</Text>
              // {/* <EyeOpen name="eye-off" size={30} color="black" /> */}
            )
          }
        />
        <View
          style={{
            marginTop: 80,
          }}
        />
        {loading ? (
          <Text
            style={{
              alignSelf: 'center',
              color: 'white',
              fontSize: 24,
              fontWeight: '700',
              fontFamily: 'Inter',
            }}>
            Loading...
          </Text>
        ) : (
          <TouchableOpacity
            // style={{width: width - 40, backgroundColor: 'white'}}
            style={{alignSelf: 'center'}}
            disabled={disabled}
            onPress={handleSignup}>
            <Text
              style={{
                color: disabled ? 'grey' : 'white',
                fontSize: 24,
                fontWeight: '700',
                fontFamily: 'Inter',
              }}>
              Sign Up
            </Text>
          </TouchableOpacity>
        )}
        {signUpError && (
          <Text
            style={{
              alignSelf: 'center',
              marginTop: 16,
              color: 'red',
              fontSize: 18,
              fontWeight: '700',
              fontFamily: 'Inter',
            }}>
            {SignUpErrorText}
          </Text>
        )}
        <View
          style={{
            marginTop: 24,
          }}
        />
        <TouchableOpacity
          // style={{width: width - 40, backgroundColor: 'white'}}
          style={{alignSelf: 'center'}}
          // disabled={disabled}
          onPress={() => navigation.navigate('Login')}>
          <Text
            style={{
              color: 'white',
              fontSize: 16,
              fontWeight: '500',
              fontFamily: 'Inter',
            }}>
            Already have an account?{' '}
            <Text style={{color: '#00A36C'}}>LogIn</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default Signup;
