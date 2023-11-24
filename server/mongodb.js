const db = require("mongoose");
const { TYcarpark } = require("../server/models/TaoyuanCarparkData");
const { TYavailability } = require("../server/models/TaoyuanParkingAvailability");
require('dotenv').config();

const {MONGO_ROOT_PASSWORD, MONGO_ROOT_USERNAME, MONGO_dbName} = process.env;
const username = encodeURIComponent(MONGO_ROOT_USERNAME);
const password = encodeURIComponent(MONGO_ROOT_PASSWORD);
const dbName = encodeURIComponent(MONGO_dbName);
const authMechanism = 'DEFAULT';
const host = "127.0.0.1";
const port = "27017";

db.set("strictQuery", true);

const url = process.env.MONGODB_URI || `mongodb://${username}:${password}@${host}:${port}/${dbName}?authMechanism=${authMechanism}&useNewUrlParser=true&useUnifiedTopology=true`;


db.connect(url)
        .then(() => console.log('資料庫連線成功！'))
        .catch(err => console.error('資料庫連線失敗！', err));

