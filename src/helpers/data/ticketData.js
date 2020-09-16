import axios from 'axios';
import apiKeys from '../apiKeys.json';
import utils from '../utils';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getTicketByEventId = (id) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/tickets.json?orderBy="eventId"&equalTo="${id}"`)
    .then(({ data }) => {
      const thing = utils.firebaseArray(data);
      // if tickets being undefinded are an issue you can add an if statement
      // here to resolve an empty object
      resolve(thing[0]);
    })
    .catch((err) => reject(err));
});

const deleteTicket = (id) => axios.delete(`${baseUrl}/tickets/${id}.json`);

const addTicket = (newObj) => axios.post(`${baseUrl}/tickets.json`, newObj);

export default { getTicketByEventId, deleteTicket, addTicket };
