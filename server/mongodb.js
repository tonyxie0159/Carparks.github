const db = require("mongoose");
const { TYcarpark } = require("../server/models/TaoyuanCarparkData");
const { TYavailability } = require("../server/models/TaoyuanParkingAvailability");
require('dotenv').config();

const {MONGO_USERNAME, MONGO_PASSWORD, MONGO_dbName,MONGO_HOST,MONGODB_PORT} = process.env;
const username = encodeURIComponent(MONGO_USERNAME);
const password = encodeURIComponent(MONGO_PASSWORD);
const dbName = encodeURIComponent(MONGO_dbName);
const host = encodeURIComponent(MONGO_HOST);
const port = encodeURIComponent(MONGODB_PORT);

const url = process.env.MONGODB_URI || `mongodb://${username}:${password}@${host}:${port}`;


db.connect(url)
        .then(() => console.log('資料庫連線成功！'))
        .catch(err => console.error('資料庫連線失敗！', err));

