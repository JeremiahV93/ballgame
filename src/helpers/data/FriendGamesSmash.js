import eventData from './eventData';
import userData from './userData';

const userGameSmash = (email) => new Promise((resolve, reject) => {
  userData.getUserByEmail(email)
    .then((response) => {
      const user = response[0];
      eventData.getEventsByUid(user.uid)
        .then((res) => resolve(res));
    })
    .catch((err) => reject(err));
});

export default { userGameSmash };
