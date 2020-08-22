import React, {useState, useEffect, useCallback} from 'react';

import {View, Text, FlatList} from 'react-native';

import Styles from './styles';

import {Button, LoadingModal, PopUp, EmptyState} from '../../Components';

import {Icons, Colors} from '../../Assets';

import {useSelector, useDispatch} from 'react-redux';

import * as TODOActions from '../../Store/Actions/TODO';

import {useIsFocused} from '@react-navigation/native';

import moment from 'moment';

import Header from './Header';

import Tasks from './RenderTasks';
const Home = (props) => {
  const dispatch = useDispatch();
  let [Focus, setFocus] = useState(false);

  const isFocused = useIsFocused();

  // useEffect(() => {
  //   const unsubscribe = props.navigation.addListener('focus', () => {
  //     // The screen is focused
  //     // Call any action
  //     setFocus(true);
  //   });

  //   // Return the function to unsubscribe from the event so it gets removed on unmount
  //   return unsubscribe;
  // }, [props.navigation]);

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
      List: ToDoStatus,
      type: 'GET_TODO',
    };
  };

  useEffect(() => {
    if (StatusToDoResponse != null) {
      if (StatusToDoResponse == 200) {
        IsLoadingModalVisible(false);
        console.log('Wrong', StatusToDoResponse);
        dispatch(setToDoList({Status: null}));
      } else if (StatusToDoResponse == 408) {
        IsLoadingModalVisible(false);
        setMessagePopUp('No internet Connection');
        dispatch(setToDoList({Status: null}));
        setVisiabiltyPopUp(true);
      } else if (StatusToDoResponse == 401) {
        IsLoadingModalVisible(false);
        dispatch(setToDoList({Status: null}));
      }
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

  const OnEdit = (Task) => {
    props.navigation.push('AddTask', {
      Task,
    });
  };

  const OnCompleteTask = (Task) => {
    console.log('Task', Task);
    dispatch(
      TODOActions.Update_TODO(
        {
          completed: !Task['completed'],
        },
        Task,
      ),
    );
  };

  const OnDeleteTask = (Task) => {
    dispatch(TODOActions.Delete_TODO(Task['id'], Task['created']));
  };

  return (
    <View style={Styles.MainContainer}>
      <Header
        Date={`${moment().format('D MMMM, YYYY')} ${`\n`} ${moment().format(
          'dddd',
        )} ${'\n'}`}
        RightText={`${
          new Date().getHours() < 12
            ? 'Good Morning'
            : new Date().getHours() < 18
            ? 'Good Afternoon'
            : 'Good Evening'
        } ${`\n`} ${UserInfo['userName']}!`}
      />
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
            onPress={() => props.navigation.navigate('AllTasks')}
          />
        </View>
        {!TodayTODOlist.length > 0 && !LoadingModalVisible && (
          <View style={{flex: 1}}>
            <EmptyState
              MessageTitle={'No Tasks, Today'}
              IconsName={'calendar-blank'}
              titleStyle={{fontSize: 18, letterSpacing: 0.7}}
            />
          </View>
        )}

        <View style={{flex: 1}}>
          {!LoadingModalVisible && isFocused && (
            <FlatList
              data={TodayTODOlist}
              keyExtractor={(item) => item['id'].toString()}
              renderItem={({item, index}) => (
                <View style={{flex: 1}}>
                  <Tasks
                    Data={item}
                    OnEdit={OnEdit}
                    OnCompleteTask={OnCompleteTask}
                    OnDeleteTask={OnDeleteTask}
                    key={index}
                  />
                </View>
              )}
              initialNumToRender={7}
            />
          )}
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
