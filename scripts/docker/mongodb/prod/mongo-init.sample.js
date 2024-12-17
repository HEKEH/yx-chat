/** TODO: In production environment, copy this file as mongo-init.js and modify user & password */

/* eslint-disable no-undef */

function createUser(userName, password, dbName, role) {
  try {
    db = db.getSiblingDB(dbName);
    const user = db.getUser(userName);
    if (!user) {
      db.createUser({
        user: userName,
        pwd: password,
        roles: [{ role, db: dbName }],
      });
      print(`User ${userName} created successfully for database ${dbName}`);
    } else {
      print(`User ${userName} already exists for database ${dbName}`);
    }
  } catch (error) {
    print(`An error occurred: ${error.message}`);
    quit(1);
  }
}

const userName = 'yxAdmin';
const password = '111111';
const dbName = 'yx-chat';
createUser(userName, password, dbName, 'readWrite');

/** TODO: Uncomment this if you want to create a global user for all databases */
// const globalUserName = 'adminUser';
// const globalPassword = 'adminPassword';
// createUser(globalUserName, globalPassword, 'admin', 'userAdminAnyDatabase');
