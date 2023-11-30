require('dotenv').config();

const {MONGO_ROOT_PASSWORD, MONGO_ROOT_USERNAME, MONGO_dbName} = process.env;
const username = encodeURIComponent(MONGO_ROOT_USERNAME);
const password = encodeURIComponent(MONGO_ROOT_PASSWORD);
const dbName = encodeURIComponent(MONGO_dbName);

db = new Mongo().getDB(dbName);

db.createUser(
    {
      user: username,
      pwd: password,
      roles: [
        {
          role: 'readWrite',
          db: dbName,
        },
      ],
    }
  );
  

  
  db.createCollection('TYcarpark', { capped: false });
  db.createCollection('TYavailability', { capped: false });