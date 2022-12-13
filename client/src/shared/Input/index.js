import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import {useState, useEffect} from 'react';
import useWindowDimensions from 'react-native/Libraries/Utilities/useWindowDimensions';
import Tooltip from 'react-native-walkthrough-tooltip';

const Input = props => {
  const [focused, setFocused] = useState(false);
  const [lowerLimit, setLowerLimit] = useState(false);
  const {
    otherError,
    name,
    error,
    loginError,
    setError,
    widthProp,
    ...inputProps
  } = props;

  const {width} = useWindowDimensions();

  useEffect(() => {
    if (loginError) {
      setError(true);
    }
    if (setError && inputProps?.value.length === 0) {
      setError(false);
    }
  }, [loginError]);

  const validate = (value, name) => {
    if (name === 'phonenumber') {
      let pattern = /^[5-9][0-9]{9}$/;
      if (!pattern.test(value)) {
        setError(true);
      } else {
        setError(false);
      }
    } else if (name === 'password') {
      let pattern =
        /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/;
      if (!pattern.test(value)) {
        setError(true);
      } else {
        setError(false);
      }
    } else if (name === 'confirmpassword') {
      if (inputProps?.password !== inputProps?.value) {
        setError(true);
      } else {
        setError(false);
      }
    } else if (name === 'fullName') {
      let pattern = /^[a-zA-Z ]*$/;
      if (!pattern.test(value)) {
        setError(true);
      } else {
        setError(false);
      }
    } else if (name === 'email') {
      let pattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
      if (!pattern.test(value)) {
        setError(true);
      } else {
        setError(false);
      }
    } else if (name === 'projectTitle') {
      if (value.length < 3) {
        setError(true);
        setLowerLimit(true);
      } else {
        setError(false);
        setLowerLimit(false);
      }
    }
  };

  const handleBlur = e => {
    if (inputProps?.value?.length !== 0) {
      {
        setError && validate(inputProps.value, name);
      }
    }
    if (inputProps?.value?.length === 0) {
    }
    setFocused(false);
  };

  const handleFocus = e => {
    setFocused(true);
  };

  return (
    <View style={{width: widthProp ? widthProp : width - 40}}>
      {!inputProps.disableInputHeading && (
        <View style={{flexDirection: 'row'}}>
          <Text
            style={{color: inputProps.error ? 'red' : 'white', marginRight: 5}}>
            {inputProps.heading}
          </Text>
          {inputProps.required && <Text style={{color: '#87CEEB'}}>*</Text>}
        </View>
      )}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          height: 50,
          backgroundColor: 'white',
          color: 'black',
          borderRadius: 6,
          paddingLeft: 10,
          paddingRight: 10,
          marginTop: 8,
          borderWidth: 1,
          borderColor: error ? 'red' : focused ? '#87CEEB' : 'white',
        }}>
        <TextInput
          testID={props.testID}
          name={name}
          value={inputProps.value}
          onChangeText={inputProps.onChange}
          placeholder={inputProps.placeholder}
          onBlur={handleBlur}
          onFocus={inputProps.onFocus ? inputProps.onFocus : handleFocus}
          style={{
            color: 'black',
            width: '93%',
          }}
          secureTextEntry={inputProps.secureTextEntry}
          placeholderTextColor="#8E8E93"
          keyboardType={inputProps.keyboardType}
          maxLength={inputProps.maxLength}
        />
        <TouchableOpacity
          onPress={() => {
            inputProps.setShowPassword(prev => !prev);
          }}>
          {props?.icon}
        </TouchableOpacity>
        {inputProps.tooltip && (
          <Tooltip
            isVisible={inputProps.isToolTip}
            tooltipStyle={{
              height: 74,
              width: 121,
            }}
            contentStyle={{
              backgroundColor: '#636366',
              borderColor: '#0EC99E',
              borderWidth: 2,
              borderRadius: 6,
            }}
            content={
              <Text
                style={{color: '#FAFAFA', fontFamily: 'Inter', fontSize: 11}}>
                {props.tooltipValue}
              </Text>
            }
            placement="left"
            onClose={() => {
              inputProps.setIsToolTip(false);
            }}>
            <TouchableOpacity
              onPress={() => {
                inputProps.setIsToolTip(true);
              }}>
              <Image source={inputProps.tooltipIcon} />
            </TouchableOpacity>
          </Tooltip>
        )}
      </View>
      {focused && !error && inputProps.helperText ? (
        <Text style={{color: '#ABB0AE'}}>{inputProps.helperText}</Text>
      ) : null}
      {!loginError && (
        <>
          {error && !props.multiErrorMessage ? (
            <Text style={styles.text}>
              {lowerLimit
                ? inputProps.lowerLimitErrorMessage
                : inputProps.errorMessage}
            </Text>
          ) : null}
          {error &&
            props.multiErrorMessage?.map((data, key) => (
              <Text style={styles.text} key={key}>
                {data}
              </Text>
            ))}
        </>
      )}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {},
  input: {},
  text: {
    color: 'red',
    textAlign: 'left',
  },
});
