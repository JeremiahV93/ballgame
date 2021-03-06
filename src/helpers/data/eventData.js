import axios from 'axios';
import apiKeys from '../apiKeys.json';
import utils from '../utils';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getEventsByUid = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/events.json?orderBy="uid"&equalTo="${uid}"`)
    .then(({ data }) => resolve(utils.firebaseArray(data)))
    .catch((err) => reject(err));
});

const getEventById = (id) => axios.get(`${baseUrl}/events/${id}.json`);

const deleteEvent = (id) => axios.delete(`${baseUrl}/events/${id}.json`);

const addEvent = (newObj) => axios.post(`${baseUrl}/events.json`, newObj);

const updateEvent = (obj, objid) => axios.put(`${baseUrl}/events/${objid}.json`, obj);

const addEventNotes = (eventid, addedEventObj) => axios.patch(`${baseUrl}/events/${eventid}.json`, addedEventObj);

export default {
  getEventsByUid, getEventById, deleteEvent, addEvent, updateEvent, addEventNotes,
};
