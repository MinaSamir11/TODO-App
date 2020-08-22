import React, {useEffect} from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import {Colors} from '../../Assets';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const {width} = Dimensions.get('screen');

const Header = (props) => {
  return (
    <View
      style={[
        styles.ContainerHeader,
        props.Icon && {
          alignItems: 'center',
        },
      ]}>
      <Text style={styles.txtUserName}>{props.Date}</Text>
      {props.Icon ? (
        <View style={{marginEnd: 25}}>
          <Icon
            name={'calendar-month-outline'}
            size={40}
            color={Colors.SecondMainColor}
          />
        </View>
      ) : (
        <Text style={styles.txtUserName}>{props.RightText}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  txtUserName: {
    fontSize: 19,
    fontWeight: 'bold',
    lineHeight: 30,
    marginStart: 25,
    color: Colors.White,
    letterSpacing: 0.5,
    marginEnd: 25,
  },
  ContainerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default Header;
