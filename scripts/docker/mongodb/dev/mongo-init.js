/** TODO: in production, copy this file to prod/mongo-init.js and change the username and password  */
const userName = 'YX';
const password = '123456';

const dbName = 'yx-chat';

/* eslint-disable no-undef */
db = db.getSiblingDB(dbName);
const user = db.getUser(userName);
if (!user) {
  db.createUser({
    user: userName,
    pwd: password,
    roles: [{ role: 'readWrite', db: dbName }],
  });
}
