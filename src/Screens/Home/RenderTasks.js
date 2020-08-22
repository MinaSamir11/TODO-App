import React, {useEffect} from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
  Dimensions,
} from 'react-native';

import {Colors} from '../../Assets';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const {width} = Dimensions.get('screen');

const Task = (props) => {
  let opacity = new Animated.Value(0);

  const animate = (easing) => {
    opacity.setValue(0);
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1700,
      useNativeDriver: false,
      easing,
    }).start();
  };

  const sizeWidth = opacity.interpolate({
    inputRange: [0, 1],
    outputRange: [0, width - 45],
  });

  const animatedStyles = [
    styles.MainContainer,
    {
      opacity,
      width: sizeWidth,
    },
  ];

  useEffect(() => animate(Easing.out(Easing.exp)), []);

  return (
    <Animated.View style={animatedStyles}>
      <View style={styles.TitleContainer}>
        <Text style={styles.titleTxt}>{props.Data['title']}</Text>
        <TouchableOpacity onPress={() => props.OnEdit(props.Data)}>
          <Icon name={'pencil'} size={20} color={Colors.fontDark} />
        </TouchableOpacity>
      </View>
      <View style={{marginTop: 13, marginBottom: 20}}>
        <Text style={styles.ContentTxt}>{props.Data['content']}</Text>
      </View>
      <View style={styles.CompleteDeleteContainer}>
        <TouchableOpacity onPress={() => props.OnDeleteTask(props.Data)}>
          <Icon name={'delete'} size={20} color={'#540D47'} />
        </TouchableOpacity>
        {props.Data['completed'] && <Text style={styles.DoneTxt}>Done</Text>}
        <TouchableOpacity onPress={() => props.OnCompleteTask(props.Data)}>
          <Icon
            name={
              props.Data['completed']
                ? 'checkbox-marked-circle'
                : 'checkbox-marked-circle-outline'
            }
            size={20}
            color={
              props.Data['completed']
                ? Colors.MainColor
                : Colors.SecondRelativeMainColor
            }
          />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  MainContainer: {
    padding: 10,
    width: '90%',
    backgroundColor: Colors.White,
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 15,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    flex: 1,
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
