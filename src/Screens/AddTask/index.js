import React, {useState, useEffect, useCallback} from 'react';

import {View, Text, ScrollView} from 'react-native';

import Styles from './styles';

import {Button, LoadingModal, PopUp, Input} from '../../Components';

import {Icons, Colors} from '../../Assets';

import {useSelector, useDispatch} from 'react-redux';

import * as TODOActions from '../../Store/Actions/TODO';

import {CalendarList} from 'react-native-calendars';

import moment from 'moment';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import ProcessModal from './ProcessModal';

const Home = (props) => {
  const dispatch = useDispatch();

  const setToDoList = (ToDoStatus) => {
    return {
      Status: ToDoStatus.Status,
      type: 'SET_TODO_RESPONSE',
    };
  };

  const StatusToDoResponse = useSelector(
    (state) => state.TODO.StatusToDoResponse,
  );

  let [LoadingModalVisible, IsLoadingModalVisible] = useState(false);

  let [PopupModel, setVisiabiltyPopUp] = useState(false);

  let [MessagePopUp, setMessagePopUp] = useState('');

  let [StartDate, setStartDate] = useState('');

  let [EndDate, setEndDate] = useState('');

  let [TaskName, setTaskName] = useState(null);

  let [TaskContent, setTaskContent] = useState('');

  let [markedDate, setmarkedDate] = useState([]);

  let [ShowProcessModal, setShowProcessModal] = useState(false);

  let [ClosedAnimation, setClosedAnimation] = useState(false);

  useEffect(() => {
    if (EndDate !== '') {
      const date1 = new Date(StartDate);
      const date2 = new Date(EndDate);
      const diffTime = Math.abs(date2 - date1);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      let temp = {};
      let cart = [];
      for (let i = 0; i < diffDays + 1; i++) {
        var tomorrow = new Date(StartDate);

        tomorrow.setDate(tomorrow.getDate() + i);

        temp[tomorrow.toISOString().slice(0, 10)] = InitMarkedDate(
          tomorrow.toISOString().slice(0, 10),
        );
        cart.push(temp);
      }
      setmarkedDate([...cart]);
    }
  }, [EndDate, StartDate]);

  useEffect(() => {
    if (StatusToDoResponse != null) {
      if (StatusToDoResponse == 201) {
        IsLoadingModalVisible(false);
        setShowProcessModal(true);
      } else if (StatusToDoResponse == 401) {
        IsLoadingModalVisible(false);
        setShowProcessModal(true);
      } else if (StatusToDoResponse == 408) {
        IsLoadingModalVisible(false);
        setShowProcessModal(true);
      } else {
        IsLoadingModalVisible(false);
      }
    }
  }, [StatusToDoResponse]);

  const InitMarkedDate = (date) => {
    if (date === StartDate) {
      return {
        customStyles: {
          container: {
            backgroundColor: Colors.SecondRelativeMainColor,
            padding: 5,
          },
          text: {
            color: '#E6EFF6',
            fontWeight: 'bold',
            textAlign: 'center',
            fontSize: 11,
          },
        },
      };
    } else if (date === EndDate) {
      return {
        customStyles: {
          container: {
            backgroundColor: Colors.SecondRelativeMainColor,
          },
          text: {
            color: '#E6EFF6',
            fontWeight: 'bold',
            padding: 5,
            fontSize: 11,
          },
        },
      };
    }
  };

  const OnChangeDay = (day) => {
    console.log(day);
    if (StartDate == '') {
      setStartDate(day.dateString);
      var tomorrow = new Date(day.dateString);

      tomorrow.setDate(tomorrow.getDate());

      setmarkedDate([
        {
          [tomorrow.toISOString().slice(0, 10)]: InitMarkedDate(
            tomorrow.toISOString().slice(0, 10),
          ),
        },
      ]);
    } else {
      const date1 = new Date(StartDate);
      const date2 = new Date(day.dateString);

      if (date2 - date1 < 0) {
        setStartDate(day.dateString);
      } else {
        setEndDate(day.dateString);
      }
    }
  };

  const OnLongPress = (day) => {
    const date1 = new Date(EndDate);
    const date2 = new Date(day.dateString);
    if (date2 - date1 < 0) {
      setStartDate(day.dateString);
    } else {
      var tomorrow = new Date(day.dateString);
      setStartDate(day.dateString);
      setEndDate(tomorrow.toISOString().slice(0, 10));
    }
  };

  const PopupactionFunction = useCallback(() => {
    setVisiabiltyPopUp(() => false);
  }, [setVisiabiltyPopUp]);

  const OnChangeTaskName = (text) => {
    setTaskName(text);
  };

  const OnChangeTaskContent = (text) => {
    setTaskContent(text);
  };

  const OnAddTask = () => {
    if (TaskName !== null && TaskName !== '') {
      if (StartDate !== '' && EndDate !== '') {
        IsLoadingModalVisible(true);
        dispatch(
          TODOActions.Create_TODO({
            title: TaskName,
            content: TaskContent,
            created: StartDate,
            completed: false,
            due_date: EndDate,
          }),
        );
      } else {
        setMessagePopUp('Please Enter Date');
        setVisiabiltyPopUp(true);
      }
    } else if (StartDate === '' || EndDate === '') {
      setMessagePopUp('Please Enter Date');
      setVisiabiltyPopUp(true);
    } else {
      console.log(EndDate);
      setMessagePopUp('Please Enter Task Name');
      setVisiabiltyPopUp(true);
    }
  };

  const OnCloseTProcessModal = () => {
    setShowProcessModal(false);
    setClosedAnimation(false);

    dispatch(
      setToDoList({
        Status: null,
      }),
    );
  };

  const OnProcessModalSuccess = () => {
    OnCloseTProcessModal();
    props.navigation.goBack();
  };
  const OnProcessModalFaild = () => {
    setClosedAnimation(true);
  };

  return (
    <View style={Styles.MainContainer}>
      <View style={Styles.MainContainerHeaderDate}>
        <View style={Styles.ContainerSelectDate}>
          <Text style={Styles.SelectDateTxt}>
            {StartDate
              ? moment(StartDate).format('D MMM, YYYY')
              : 'Select Date'}
          </Text>

          <Text style={Styles.Day}>
            {StartDate && moment(StartDate).format('dddd')}
          </Text>
        </View>
        <View style={Styles.ContainerIcon}>
          <Icon
            name={'chevron-right'}
            size={30}
            color={Colors.GrayBackgroundColor}
          />
        </View>
        <View style={Styles.DueDate}>
          <Text style={Styles.SelectDateTxt}>
            {EndDate ? moment(EndDate).format('D MMM, YYYY') : 'Due Date'}
          </Text>

          <Text style={Styles.Day}>
            {EndDate && moment(EndDate).format('dddd')}
          </Text>
        </View>
      </View>
      <ScrollView>
        <CalendarList
          markingType={'custom'}
          markedDates={markedDate[0]}
          pastScrollRange={20}
          // Max amount of months allowed to scroll to the future. Default = 50
          futureScrollRange={20}
          style={{marginTop: 15}}
          hideDayNames={true}
          horizontal={true}
          pagingEnabled={true}
          theme={{
            calendarBackground: '#FAFAFA',
            textDayFontWeight: 'bold',
            textDisabledColor: Colors.placeHolder,
            todayTextColor: Colors.MainColor,
            dayTextColor: '#000',
            monthTextColor: Colors.MainColor,
            textDayFontSize: 10,
            textMonthFontSize: 10,
            textDayHeaderFontSize: 10,
            textDayFontFamily: 'monospace',
            textMonthFontFamily: 'monospace',
            textDayHeaderFontFamily: 'monospace',
          }}
          current={new Date()}
          minDate={new Date()}
          onDayPress={(day) => OnChangeDay(day)}
          onDayLongPress={(day) => OnLongPress(day)}
        />

        <View style={Styles.MainContainerAddTask}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={Styles.AddTaskTxt}>ADD TASK DETAILS</Text>
            <Button
              title={'Add Task'}
              Customstyle={Styles.AddTaskBtn}
              BtnTitleStyle={Styles.TitleBtn}
              onPress={OnAddTask}
            />
          </View>
          <Input
            maxLength={250}
            Error={TaskName !== '' ? false : true}
            ErrorTitle={'Task name is required'}
            PlaceHolder={'Enter Task Name'}
            onChangeText={OnChangeTaskName}
            ContainerView={{marginTop: 20}}
            InputStyle={Styles.InputTaskName}
            placeholderTextColor={Colors.LightGrey}
          />
          <Input
            maxLength={500}
            multiline
            PlaceHolder={'Enter Task Content'}
            onChangeText={OnChangeTaskContent}
            ContainerView={{height: '50%'}}
            InputStyle={Styles.InputTaskContent}
            placeholderTextColor={Colors.LightGrey}
          />
        </View>
      </ScrollView>
      <PopUp
        visible={PopupModel}
        message={MessagePopUp}
        LeftBtnName={'OK'}
        topIcon={Icons.WrongPopUp}
        LeftBtnFunction={PopupactionFunction}
      />

      <ProcessModal
        ClosedAnimation={ClosedAnimation}
        TransactionStatus={StatusToDoResponse == 201 ? 'Success' : 'Failed '}
        TransactionMessage={
          StatusToDoResponse == 201
            ? 'Task created successfully'
            : StatusToDoResponse == 408
            ? 'no internet connection'
            : 'Oh no, somthing went wrong try Again later'
        }
        BtnTitle={
          StatusToDoResponse == 201 ? 'Back To TODO Home!' : 'Try again, later'
        }
        ShowTransaction={ShowProcessModal}
        OnDismiss={OnCloseTProcessModal}
        ImageStatus={StatusToDoResponse == 201 ? Icons.Success : Icons.Failed}
        TakeAction={
          StatusToDoResponse == 201
            ? OnProcessModalSuccess
            : OnProcessModalFaild
        }
      />
      <LoadingModal LoadingModalVisiblty={LoadingModalVisible} />
    </View>
  );
};

export default Home;
