import * as types from '../Actions/types';
import initialState from './initialState';

export default function (state = initialState.TODO, action) {
  switch (action.type) {
    case types.GET_TODO: {
      return {
        ...state,
        ToDoList: action.TODOList.TODOList,
        TodayTODOList: action.TODOList.TodayTODOList,
        StatusToDoResponse: action.TODOList.Status,
      };
    }
    case types.SET_TODO_RESPONSE: {
      return {
        ...state,
        StatusToDoResponse: action.Status,
      };
    }
    default:
      return {
        ...state,
      };
  }
}
