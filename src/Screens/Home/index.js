import React, {useState, useEffect, useCallback} from 'react';

import {View, Text, ScrollView} from 'react-native';

import Styles from './styles';

import {Button, LoadingModal, PopUp} from '../../Components';

import {Icons, Colors} from '../../Assets';

import {useSelector, useDispatch} from 'react-redux';

import * as Auth from '../../Store/Actions/Auth';

const Home = (props) => {
  const dispatch = useDispatch();

  const UserInfo = useSelector((state) => state.Auth.UserInfo);

  let [LoadingModalVisible, IsLoadingModalVisible] = useState(false);

  let [PopupModel, setVisiabiltyPopUp] = useState(false);

  let [MessagePopUp, setMessagePopUp] = useState('');

  const setUserProfile = (userState) => {
    return {
      userData: userState,
      type: 'GET_SIGNINAUTH',
    };
  };

  useEffect(() => {
    if (UserInfo.Status == 200) {
      IsLoadingModalVisible(false);
      dispatch(setUserProfile({...UserInfo, Status: 0}));
    } else if (UserInfo.Status == 50) {
      IsLoadingModalVisible(false);
      setMessagePopUp('No internet Connection');
      setVisiabiltyPopUp(true);
    }
  }, [UserInfo]);

  const PopupactionFunction = useCallback(() => {
    setVisiabiltyPopUp(() => false);
  }, [setVisiabiltyPopUp]);

  return (
    <View style={Styles.MainContainer}>
      <View style={{marginTop: 40}}>
        <Text style={Styles.txtUserName}>
          Hello, Mina ! {'\n'} {new Date().toDateString()}
        </Text>
      </View>

      <View style={Styles.ContainerTodayTask}>
        <Text style={Styles.TodayTasks}>Today's Tasks</Text>
        <Button
          title={'View All Tasks'}
          Customstyle={{
            marginTop: 0,
            backgroundColor: 'transparent',
            marginEnd: 25,
          }}
          BtnTitleStyle={{
            color: Colors.MainColor,
            fontSize: 12,
            textDecorationLine: 'underline',
          }}
          onPress={() => {}}
        />
      </View>

      <Button
        Customstyle={{
          marginTop: 0,
          width: 60,
          height: 60,
          borderRadius: 30,
          backgroundColor: Colors.RelativeMainColor,
          position: 'absolute',
          bottom: 10,
          right: 10,
        }}
        IconLeftName={'plus'}
        IconColor={Colors.SecondRelativeMainColor}
        IconSize={30}
        onPress={() => {
          props.navigation.push('AddTask');
        }}
      />
      <PopUp
        visible={PopupModel}
        message={MessagePopUp}
        LeftBtnName={'OK'}
        topIcon={Icons.WrongPopUp}
        LeftBtnFunction={PopupactionFunction}
      />
      <LoadingModal LoadingModalVisiblty={LoadingModalVisible} />
    </View>
  );
};

export default Home;
