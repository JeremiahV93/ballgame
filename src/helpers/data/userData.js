import axios from 'axios';
import apiKeys from '../apiKeys.json';
import utils from '../utils';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getUserData = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/users.json?orderBy="uid"&equalTo="${uid}"`)
    .then(({ data }) => resolve(utils.firebaseArray(data)))
    .catch((err) => reject(err));
});

const getUserByEmail = (email) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/users.json?orderBy="email"&equalTo="${email}"`)
    .then(({ data }) => resolve(utils.firebaseArray(data)))
    .catch((err) => reject(err));
});

const addUser = (newUser) => axios.post(`${baseUrl}/users.json`, newUser);

const updateUser = (userId, userobj) => axios.put(`${baseUrl}/users/${userId}.json`, userobj);

export default {
  getUserData, updateUser, addUser, getUserByEmail,
};
