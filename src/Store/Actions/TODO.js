import * as types from './types';

import ApiConstant, {Api} from '../../Utils/Api';

const setToDoList = (ToDo) => {
  let TODOtemp = ToDo.TODOList ? ToDo : null;

  if (TODOtemp !== null) {
    return {
      TODOList: TODOtemp,
      type: types.GET_TODO,
    };
  } else {
    return {
      Status: ToDo.Status,
      type: types.SET_TODO_RESPONSE,
    };
  }
};

const check_TodaytaskDate = (date) => {
  const today = new Date();

  const year = date.substring(0, 4);
  const Months = date.substring(5, 7);
  const day = date.substring(8, 10);

  return (
    day === today.getDate().toString() &&
    Months === '0' + (today.getMonth() + 1) &&
    year === today.getFullYear().toString()
  );
};

const Filter_TodayTasks = (List) => {
  let temp = [];
  for (let i = 0; i < List.length; i++) {
    if (check_TodaytaskDate(List[i]['created'])) {
      temp.push(List[i]);
    }
  }
  return temp;
};
export const get_TODOlist = () => {
  return async (dispatch) => {
    //need header Authorization in first param , "Relative url" , ToDo data

    let TODOListRequest = await Api.get(true, ApiConstant.Todo);

    if (TODOListRequest) {
      //error
      if (TODOListRequest.response) {
        // Request made and server responded
        console.log(TODOListRequest.response.data);
        console.log(TODOListRequest.response.status);
        console.log(TODOListRequest.response.headers);
        dispatch(
          setToDoList({
            Status: TODOListRequest.response.status,
          }),
        );
      } else if (TODOListRequest.status == 200) {
        console.log('API token', TODOListRequest);

        let TodayTasks = Filter_TodayTasks(TODOListRequest.data);

        dispatch(
          setToDoList({
            TODOList: TODOListRequest.data,
            TodayTODOList: TodayTasks,
            Status: TODOListRequest.status,
          }),
        );
      } else {
        console.log('Ress', TODOListRequest.status);
        dispatch(
          setToDoList({
            Status: TODOListRequest.status,
          }),
        );
      }
    } else {
      console.log('Error Network ', TODOListRequest.response.status);
      dispatch(
        setToDoList({
          Status: 500,
        }),
      );
    }
  };
};

export const Create_TODO = (TODOTask) => {
  return async (dispatch, getState) => {
    let myJson = JSON.stringify(TODOTask);
    //need header Authorization in first param , "Relative url" , ToDo data
    let CreateTODORequest = await Api.post(true, ApiConstant.Todo, myJson);

    if (CreateTODORequest) {
      //error
      if (CreateTODORequest.response) {
        // Request made and server responded
        console.log(CreateTODORequest.response.data);
        console.log(CreateTODORequest.response.status);
        console.log(CreateTODORequest.response.headers);
        dispatch(
          setToDoList({
            Status: CreateTODORequest.response.status,
          }),
        );
      } else if (CreateTODORequest.status == 201) {
        let TODOList = getState().TODO.ToDoList;
        let TodayTasks = getState().TODO.TodayTODOList;
        if (check_TodaytaskDate(CreateTODORequest.data['created'])) {
          TodayTasks.push(CreateTODORequest.data);
        }
        TODOList.push(CreateTODORequest.data);

        dispatch(
          setToDoList({
            ...TODOList,
            TodayTODOList: TodayTasks,
            Status: CreateTODORequest.status,
          }),
        );
      } else if (CreateTODORequest.status == undefined) {
        console.log('Ress', CreateTODORequest);
        dispatch(
          setToDoList({
            Status: 408,
          }),
        );
      }
    } else {
      dispatch(
        setToDoList({
          Status: 408,
        }),
      );
    }
  };
};
