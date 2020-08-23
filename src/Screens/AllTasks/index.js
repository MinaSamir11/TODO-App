import React, {useState, useEffect, useCallback} from 'react';

import {View, Text, ScrollView, RefreshControl, FlatList} from 'react-native';

import Styles from './styles';

import {Button, LoadingModal, PopUp, EmptyState} from '../../Components';

import {Icons} from '../../Assets';

import {useSelector, useDispatch} from 'react-redux';

import * as TODOActions from '../../Store/Actions/TODO';

import moment from 'moment';

import Tasks from './RenderTasks';

import Header from '../Home/Header';

const AllTasks = (props) => {
  const dispatch = useDispatch();

  const StatusToDoResponse = useSelector(
    (state) => state.TODO.StatusToDoResponse,
  );

  const AllTodoList = useSelector((state) => state.TODO.ToDoList);

  let [LoadingModalVisible, IsLoadingModalVisible] = useState(false);

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

  const PopupactionFunction = useCallback(() => {
    setVisiabiltyPopUp(() => false);
  }, [setVisiabiltyPopUp]);

  const OnEdit = (Task) => {
    props.navigation.push('AddTask', {
      Task,
    });
  };

  const OnCompleteTask = (Task) => {
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

  const renderTasks = (item, index) => {
    return (
      <View key={index}>
        <View style={Styles.ContainerTOFROM}>
          <Text style={Styles.To}>
            {moment(item['created']).format('ddd D MMM, YYYY')}
          </Text>
          <Text style={Styles.From}>
            {moment(item['due_date']).format('ddd D MMM, YYYY')}
          </Text>
        </View>
        <Tasks
          Data={item}
          OnEdit={OnEdit}
          OnCompleteTask={OnCompleteTask}
          OnDeleteTask={OnDeleteTask}
        />
      </View>
    );
  };
  return (
    <View style={Styles.MainContainer}>
      <Header
        Date={`${moment().format('D MMMM, YYYY')} ${`\n`} ${moment().format(
          'dddd',
        )} ${'\n'}`}
        Icon
      />
      <View
        style={{backgroundColor: '#E6EFF6', flex: 1, borderTopRightRadius: 50}}>
        <View style={Styles.ContainerAllTask}>
          <Text style={Styles.AllTasks}>COMPLETED / REMAINING TASKS</Text>
        </View>
        {!AllTodoList.length > 0 && !LoadingModalVisible && (
          <View style={{flex: 1}}>
            <EmptyState
              MessageTitle={"You Don't have Tasks, Yet"}
              IconsName={'calendar-blank-multiple'}
              titleStyle={{fontSize: 18, letterSpacing: 0.7}}
            />
          </View>
        )}
        <View style={{flex: 1}}>
          <ScrollView>
            {AllTodoList.map((item, index) => renderTasks(item, index))}
          </ScrollView>
        </View>
      </View>

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

export default AllTasks;
