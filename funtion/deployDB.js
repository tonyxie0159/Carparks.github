const mongoose = require('mongoose');
const TDX_api = require("../server/middleware/TDXapi");
require('dotenv').config();


const {MONGO_ROOT_PASSWORD, MONGO_ROOT_USERNAME, MONGO_dbName} = process.env;
const username = encodeURIComponent(MONGO_ROOT_USERNAME);
const password = encodeURIComponent(MONGO_ROOT_PASSWORD);
const dbName = encodeURIComponent(MONGO_dbName);
const authMechanism = 'DEFAULT';
const host = "127.0.0.1";
const port = "27017";

const url = process.env.MONGODB_URI || `mongodb://${username}:${password}@${host}:${port}/${dbName}?authMechanism=${authMechanism}&useNewUrlParser=true&useUnifiedTopology=true`;

async function updateDB() {
    try{
        await TDX_api.SaveCarparkData();
        TDX_api.SaveAvailabilityData();
    } catch (error) {
        console.log('資料庫更新失敗:',error);
    } 
}

const connectOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 180000, // 3分鐘
    socketTimeoutMS: 180000, // 3分鐘
  };

mongoose.connect(url, connectOptions);

const db = mongoose.connection;

db.on('connected', () => {
    console.log('成功連接到 MongoDB 資料庫');
    updateDB();
  });





