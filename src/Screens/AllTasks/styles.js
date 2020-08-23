import {StyleSheet} from 'react-native';

import {Colors} from '../../Assets';

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: Colors.SecondRelativeMainColor,
  },
  txtUserName: {
    fontSize: 19,
    fontWeight: 'bold',
    lineHeight: 30,
    marginStart: 25,
    color: Colors.White,
    letterSpacing: 0.5,
    marginEnd: 25,
  },
  ContainerAllTask: {
    marginTop: 15,
    flexDirection: 'row',
    marginStart: 25,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: Colors.Black,
    borderBottomWidth: 0.5,
  },
  AllTasks: {
    fontSize: 19,
    fontWeight: 'bold',
    lineHeight: 30,
    color: Colors.SecondRelativeMainColor,
    letterSpacing: 0.5,
  },
  To: {
    fontSize: 17,
    letterSpacing: 0.8,
    fontWeight: 'bold',
  },
  From: {
    fontSize: 17,
    letterSpacing: 0.8,
    fontWeight: 'bold',
  },
  ContainerTOFROM: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    marginBottom: 8,
  },
});

export default styles;
