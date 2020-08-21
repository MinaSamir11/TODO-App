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
      List: ToDoStatus,
      type: 'SET_UPDATED_TODO',
    };
  };

  const UpdatedToDoResponse = useSelector(
    (state) => state.TODO.UpdatedToDoResponse,
  );

  let [LoadingModalVisible, IsLoadingModalVisible] = useState(false);

  let [PopupModel, setVisiabiltyPopUp] = useState(false);

  let [MessagePopUp, setMessagePopUp] = useState('');

  let [StartDate, setStartDate] = useState(
    props.route.params !== undefined ? props.route.params.Task['created'] : '',
  );

  let [EndDate, setEndDate] = useState(
    props.route.params !== undefined ? props.route.params.Task['due_date'] : '',
  );

  let [TaskName, setTaskName] = useState(
    props.route.params !== undefined ? props.route.params.Task['title'] : null,
  );

  let [TaskContent, setTaskContent] = useState(
    props.route.params !== undefined ? props.route.params.Task['content'] : '',
  );

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
    if (UpdatedToDoResponse != null) {
      if (UpdatedToDoResponse == 201) {
        IsLoadingModalVisible(false);
        setShowProcessModal(true);
      } else if (UpdatedToDoResponse == 200) {
        IsLoadingModalVisible(false);
        setMessagePopUp('Done');
        setVisiabiltyPopUp(true);
      } else if (UpdatedToDoResponse == 401) {
        IsLoadingModalVisible(false);
        setShowProcessModal(true);
      } else if (UpdatedToDoResponse == 408) {
        IsLoadingModalVisible(false);
        setShowProcessModal(true);
      } else {
        IsLoadingModalVisible(false);
      }
    }
  }, [UpdatedToDoResponse]);

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

  const PopupactionFunction = () => {
    setVisiabiltyPopUp(() => false);
    if (MessagePopUp == 'Done') {
      props.navigation.goBack();
      dispatch(
        setToDoList({
          Status: null,
        }),
      );
    }
  };

  const OnChangeTaskName = (text) => {
    setTaskName(text);
  };

  const OnChangeTaskContent = (text) => {
    setTaskContent(text);
  };

  const CheckChangedData = () => {
    if (props.route.params !== undefined) {
      if (props.route.params.Task['title'] !== TaskName) return false;
      else if (props.route.params.Task['content'] !== TaskContent) return false;
      else if (props.route.params.Task['created'] !== StartDate) return false;
      else if (props.route.params.Task['due_date'] !== EndDate) return false;
      else {
        return true;
      }
    }
  };

  const OnAddEditTask = () => {
    if (TaskName !== null && TaskName !== '') {
      if (StartDate !== '' && EndDate !== '') {
        IsLoadingModalVisible(true);
        if (props.route.params === undefined) {
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
          dispatch(
            TODOActions.Update_TODO(
              {
                title: TaskName,
                content: TaskContent,
                created: StartDate,
                due_date: EndDate,
              },
              {
                ...props.route.params.Task,
              },
            ),
          );
        }
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
    setShowProcessModal(false);
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
            <Text style={Styles.AddTaskTxt}>
              {props.route.params === undefined ? 'ADD' : 'EDIT'} TASK DETAILS
            </Text>
            <Button
              disabled={
                props.route.params === undefined ? false : CheckChangedData()
              }
              title={
                props.route.params !== undefined ? 'Edit Task' : 'Add Task'
              }
              Customstyle={[
                Styles.AddTaskBtn,
                CheckChangedData()
                  ? {backgroundColor: '#000'}
                  : {backgroundColor: Colors.MainColor},
              ]}
              BtnTitleStyle={Styles.TitleBtn}
              onPress={OnAddEditTask}
            />
          </View>
          <Input
            InputValue={TaskName}
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
            InputValue={TaskContent}
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
        TransactionStatus={UpdatedToDoResponse == 201 ? 'Success' : 'Failed '}
        TransactionMessage={
          UpdatedToDoResponse == 201
            ? 'Task created successfully'
            : UpdatedToDoResponse == 408
            ? 'no internet connection'
            : 'Oh no, somthing went wrong try Again later'
        }
        BtnTitle={
          UpdatedToDoResponse == 201 ? 'Back To TODO Home!' : 'Try again, later'
        }
        ShowTransaction={ShowProcessModal}
        OnDismiss={OnCloseTProcessModal}
        ImageStatus={UpdatedToDoResponse == 201 ? Icons.Success : Icons.Failed}
        TakeAction={
          UpdatedToDoResponse == 201
            ? OnProcessModalSuccess
            : OnProcessModalFaild
        }
      />
      <LoadingModal LoadingModalVisiblty={LoadingModalVisible} />
    </View>
  );
};

export default Home;
