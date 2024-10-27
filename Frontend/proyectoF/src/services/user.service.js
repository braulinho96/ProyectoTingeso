import axios from 'axios';

const API_URL = 'http://localhost:8091/api/users';

const create = (user) => {
  return axios.post(API_URL, user);
};

const login = async (rut, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, null, {
      params: { rut, password }, 
    });
    return response.data; 
  } catch (error) {
    throw new Error('Login failed'); 
  }
};

const userService = { create, login };

export default userService;
