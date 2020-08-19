import * as types from './types';

import AsyncStorage from '@react-native-community/async-storage';

import ApiConstant, {Api} from '../../Utils/Api';

const setUser = (userState) => {
  return {
    userData: userState,
    type: types.GET_SIGNINAUTH,
  };
};

export const SignUpAuth = (Account) => {
  return async (dispatch) => {
    let formDataAccount = new FormData();

    formDataAccount.append('username', Account.username);
    formDataAccount.append('password', Account.password);

    let Request = await Api.post(ApiConstant.Register, formDataAccount);

    if (Request) {
      if (Request.response) {
        // Request made and server responded
        console.log(Request.response.data);
        console.log(Request.response.status);
        console.log(Request.response.headers);

        dispatch(
          setUser({
            Status: Request.response.status,
          }),
        );
      }
      if (Request.status == 201) {
        let RequestToken = await Api.post(
          ApiConstant.TokenCreate,
          formDataAccount,
        );
        console.log('API token', RequestToken);
        if (RequestToken.status == 200) {
          dispatch(
            setUser({
              ...RequestToken.data,
              ...Account.username,
              Status: RequestToken.status,
            }),
          );
          //store in asyncstorage
          storeData({
            userName: Account.username,
            ...RequestToken.data,
          });
        } else {
          console.log('Ress', RequestToken.response.status);
          dispatch(
            setUser({
              Status: RequestToken.response.status,
            }),
          );
        }
      }
    }
  };
};

const storeData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('com.dailymealz.userInfo', jsonValue);
    getData();
  } catch (e) {
    // saving error
  }
};

const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('com.dailymealz.userInfo');
    console.log('Async storage', jsonValue);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
};

export const SignInAuth = (Account) => {
  return async (dispatch) => {
    let formDataAccount = new FormData();

    formDataAccount.append('username', Account.username);
    formDataAccount.append('password', Account.password);

    let RequestToken = await Api.post(ApiConstant.TokenCreate, formDataAccount);
    console.log('API token', Request);

    if (RequestToken) {
      if (RequestToken.response) {
        // Request made and server responded
        console.log(RequestToken.response.data);
        console.log(RequestToken.response.status);
        console.log(RequestToken.response.headers);

        dispatch(
          setUser({
            Status: RequestToken.response.status,
          }),
        );
      }

      if (RequestToken.status == 200) {
        dispatch(
          setUser({
            ...RequestToken.data,
            ...Account.username,
            Status: RequestToken.status,
          }),
        );
        //store in asyncstorage
        storeData({
          ...Account.username,
          ...RequestToken.data,
        });
      } else {
        console.log('Ress', RequestToken.response.status);
        dispatch(
          setUser({
            Status: RequestToken.response.status,
          }),
        );
      }
    }
  };
};
