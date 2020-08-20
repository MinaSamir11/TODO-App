import {StyleSheet} from 'react-native';

import {Colors} from '../../Assets';

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: Colors.GrayBackgroundColor,
  },
  txtUserName: {
    fontSize: 19,
    fontWeight: 'bold',
    lineHeight: 30,
    marginLeft: 25,
    color: Colors.SecondRelativeMainColor,
    letterSpacing: 0.5,
  },
  ContainerTodayTask: {
    marginTop: 40,
    flexDirection: 'row',
    marginStart: 25,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  TodayTasks: {
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 30,
    color: Colors.SecondRelativeMainColor,
    letterSpacing: 0.5,
  },
});

export default styles;
