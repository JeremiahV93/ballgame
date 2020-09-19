import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getUserData = (id) => axios.get(`${baseUrl}/uers/${id}.json`);

const addUser = (newUser) => axios.post(`${baseUrl}/users.json`, newUser);

const updateUser = (userId, userobj) => axios.patch(`${baseUrl}/users/${userId}.json`, userobj);

export default { getUserData, updateUser, addUser };
