import React from 'react';

import {View, Text, StyleSheet} from 'react-native';

import {Colors} from '../../Assets';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Task = (props) => {
  return (
    <View style={styles.MainContainer}>
      <View style={styles.TitleContainer}>
        <Text style={styles.titleTxt}>{props.Data['title']}</Text>
        <TouchableOpacity onPress={() => props.OnEdit(props.Data['id'])}>
          <Icon name={'pencil'} size={20} color={Colors.fontDark} />
        </TouchableOpacity>
      </View>
      <View style={{marginTop: 13, marginBottom: 20}}>
        <Text style={styles.ContentTxt}>{props.Data['content']}</Text>
      </View>
      <View style={styles.CompleteDeleteContainer}>
        <TouchableOpacity onPress={() => {}}>
          <Icon name={'delete'} size={20} color={'#540D47'} />
        </TouchableOpacity>
        {props.Data['complete'] && <Text style={styles.DoneTxt}>Done</Text>}
        <TouchableOpacity onPress={() => {}}>
          <Icon
            name={'checkbox-marked-circle-outline'}
            size={20}
            color={Colors.SecondRelativeMainColor}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  MainContainer: {
    padding: 10,
    backgroundColor: Colors.White,
    width: '90%',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 15,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  TitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-between',
  },
  titleTxt: {
    color: Colors.SecondRelativeMainColor,
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  CompleteDeleteContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  DoneTxt: {
    textAlign: 'center',
    color: Colors.MainColor,
    fontSize: 12,
  },
  ContentTxt: {
    color: Colors.SecondRelativeMainColor,
    letterSpacing: 0.7,
    fontSize: 14,
  },
});

export default Task;
