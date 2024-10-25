import axios from 'axios';

const API_URL = 'http://localhost:8091/api/users/';

const create = (user) => {
  return axios.post(API_URL, user);
};

const userService = { create };

export default userService;