import React, {useState, useEffect, useCallback} from 'react';

import {View, Text, ScrollView, FlatList} from 'react-native';

import Styles from './styles';

import {Button, LoadingModal, PopUp, EmptyState} from '../../Components';

import {Icons, Colors} from '../../Assets';

import {useSelector, useDispatch} from 'react-redux';

import * as TODOActions from '../../Store/Actions/TODO';

import moment from 'moment';

import Tasks from './RenderTasks';
const Home = (props) => {
  const dispatch = useDispatch();

  const UserInfo = useSelector((state) => state.Auth.UserInfo);

  const StatusToDoResponse = useSelector(
    (state) => state.TODO.StatusToDoResponse,
  );

  const TodayTODOlist = useSelector((state) => state.TODO.TodayTODOList);

  let [LoadingModalVisible, IsLoadingModalVisible] = useState(true);

  let [PopupModel, setVisiabiltyPopUp] = useState(false);

  let [MessagePopUp, setMessagePopUp] = useState('');

  const setToDoList = (ToDoStatus) => {
    return {
      Status: ToDoStatus.Status,
      type: 'SET_TODO_RESPONSE',
    };
  };

  useEffect(() => {
    if (StatusToDoResponse == 200) {
      IsLoadingModalVisible(false);
      dispatch(setToDoList({Status: 0}));
    } else if (StatusToDoResponse == 408) {
      IsLoadingModalVisible(false);
      setMessagePopUp('No internet Connection');
      dispatch(setToDoList({Status: 0}));
      setVisiabiltyPopUp(true);
    } else if (StatusToDoResponse == 401) {
      IsLoadingModalVisible(false);
      dispatch(setToDoList({Status: 0}));
    }
  }, [StatusToDoResponse]);

  const initFetch = useCallback(() => {
    dispatch(TODOActions.get_TODOlist());
  }, [dispatch]);

  useEffect(() => {
    initFetch();
  }, [initFetch]);

  const PopupactionFunction = useCallback(() => {
    setVisiabiltyPopUp(() => false);
  }, [setVisiabiltyPopUp]);

  const OnEdit = (id) => {
    console.log('id', id);
  };

  return (
    <View style={Styles.MainContainer}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={Styles.txtUserName}>
          {moment().format('D MMMM, YYYY')} {'\n'}
          {moment().format('dddd')} {'\n'}
        </Text>
        <Text style={Styles.txtUserName}>
          {new Date().getHours() < 12
            ? 'Good Morning'
            : new Date().getHours() < 18
            ? 'Good Afternoon'
            : 'Good Evening'}
          ,{'\n'}
          {UserInfo['userName']}!
        </Text>
      </View>
      <View
        style={{backgroundColor: '#E6EFF6', flex: 1, borderTopRightRadius: 50}}>
        <View style={Styles.ContainerTodayTask}>
          <Text style={Styles.TodayTasks}>Today's Tasks</Text>
          <Button
            title={'View All Tasks'}
            Customstyle={Styles.ViewTaskBtn}
            BtnTitleStyle={{
              color: Colors.MainColor,
              fontSize: 12,
              textDecorationLine: 'underline',
            }}
            onPress={() => {}}
          />
        </View>
        {!TodayTODOlist.length > 0 && (
          <View style={{flex: 1}}>
            <EmptyState
              MessageTitle={'No Tasks TODO'}
              IconsName={'bell-off'}
              titleStyle={{fontSize: 18, letterSpacing: 0.7}}
            />
          </View>
        )}
        <View style={{flex: 1}}>
          <FlatList
            data={TodayTODOlist}
            keyExtractor={(item) => item['id'].toString()}
            renderItem={({item, index}) => (
              <Tasks Data={item} OnEdit={OnEdit} />
            )}
          />
        </View>
      </View>
      <Button
        Customstyle={Styles.FloatingBtn}
        IconLeftName={'plus'}
        IconColor={Colors.SecondRelativeMainColor}
        IconSize={30}
        onPress={() => props.navigation.push('AddTask')}
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
