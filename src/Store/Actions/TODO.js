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

export const getTODOlist = () => {
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
        dispatch(
          setToDoList({
            TODOList: TODOListRequest.data,
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
  return async (dispatch) => {
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
        dispatch(
          setToDoList({
            TODOList: CreateTODORequest.data,
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
