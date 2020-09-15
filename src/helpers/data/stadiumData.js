import axios from 'axios';
import apiKeys from '../apiKeys.json';
import utils from '../utils';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const stadiumData = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/stadiums`)
    .then(({ data }) => resolve(utils.firebaseArray(data)))
    .catch((err) => reject(err));
});

const stadiumDataById = (id) => axios.get(`${baseUrl}/stadiums/${id}.json`);

export default { stadiumData, stadiumDataById };
