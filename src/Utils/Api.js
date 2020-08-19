const axios = require('axios');

const BASE_URL = 'http://34.107.36.142/api';

export default {
  BASE_URL: 'http://34.107.36.142/api',
  Register: '/register',
  TokenCreate: '/token/',
};

class Api {
  static create() {
    return axios.create({
      baseURL: BASE_URL,
      timeout: 20000,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
  }

  static get(...args) {
    let server = this.create();

    return server.get(...args).catch((error) => {
      return error;
    });
  }

  static put(...args) {
    let server = this.create();

    return server.put(...args).catch((error) => {
      console.log(error);
      return error;
    });
  }

  static post(...args) {
    let server = this.create();

    return server.post(...args).catch((error) => {
      console.log(error);
      return error;
    });
  }

  static delete(...args) {
    let server = this.create();

    return server.delete(...args).catch((error) => {
      console.log(error);
      return error;
    });
  }
}

export {Api};
