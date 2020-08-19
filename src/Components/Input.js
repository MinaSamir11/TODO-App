import React, {useState} from 'react';

import {
  TextInput,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Input = React.memo(
  ({
    PlaceHolder,
    maxLength,
    editable,
    onChangeText,
    InputStyle,
    secureTextEntry,
    Error,
    KEY,
    ErrorTitle,
    multiline,
    changeIcon,
    IconName,
  }) => {
    const [Value, OnTextChange] = useState('');

    const textChangeHandler = (text) => {
      onChangeText(text, KEY);
      OnTextChange(text);
    };

    return (
      <View style={styles.Container}>
        <TextInput
          multiline={multiline ? multiline : false}
          secureTextEntry={secureTextEntry ? secureTextEntry : false}
          style={[styles.textInput, InputStyle]}
          placeholderStyle={{fontSize: 30}}
          editable={editable && editable}
          placeholder={PlaceHolder}
          placeholderTextColor={'#000'}
          maxLength={maxLength ? maxLength : 150}
          value={Value}
          onChangeText={textChangeHandler}
        />
        {IconName && (
          <TouchableOpacity style={styles.iconContainer} onPress={changeIcon}>
            <Icon size={25} color={'red'} name={IconName} />
          </TouchableOpacity>
        )}
        {Error && <Text style={styles.ErrorTxt}>{ErrorTitle}</Text>}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  Container: {
    alignContent: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  textInput: {
    backgroundColor: '#f1f1f1',
    marginStart: 30,
    marginEnd: 30,
    paddingHorizontal: 15,
  },
  ErrorTxt: {
    color: '#BD0325',
    marginStart: 40,
    letterSpacing: 0.7,
  },
  iconContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    alignContent: 'center',
    alignSelf: 'flex-end',
    right: '15%',
  },
  lockIcon: {
    resizeMode: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: 24,
    height: 24,
  },
});

export {Input};
